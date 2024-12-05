<template>
    <div class="recorderContainer">
        <h1 class="mb-5">Audio recording</h1>
        <button type="button" class="btn btn-success mb-2" :disabled="onAir" @click="startRecording">Start</button>
        <button type="button" class="btn btn-danger mt-2" :disabled="!onAir" @click="stopRecording">Stop</button>
        <p v-if="onAir" id="onAirLight">• on air</p>
        <div class="drag-drop-area"
             @dragover.prevent
             @dragenter.prevent="highlight"
             @dragleave="unhighlight"
             @drop.prevent="handleDrop">
            <p>Drag and drop an audio file here</p>
        </div>
    </div>
</template>

<script>
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect, disconnect } from 'extendable-media-recorder-wav-encoder';
import Vue from 'vue';

export default {
    data() {
        return {
            onAir: false,
            dragActive: false,
        };
    },
    async mounted() {
        this.stream = null;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.loopEnabled = true;
        this.recordingDeviceId = Vue.getCookie('recordDeviceId');
        await register(await connect());
    },
    methods: {
        highlight() {
            this.dragActive = true;
        },
        unhighlight() {
            this.dragActive = false;
        },
        async startRecording() {
            try {
                this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: 'audio/wav' });

                this.mediaRecorder.ondataavailable = (event) => {
                    this.audioChunks.push(event.data);
                    this.mediaRecorder.stop();
                };

                this.mediaRecorder.onstop = async () => {
                    const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                    await this.sendAudiofile(audioBlob);
                    this.audioChunks = [];
                    if (this.loopEnabled) this.mediaRecorder.start(5000);
                };

                this.mediaRecorder.start(5000);
                this.onAir = true;
            } catch (e) {
                console.error('Error:', e);
            }
        },
        stopRecording() {
            this.onAir = this.loopEnabled = false;
            this.mediaRecorder.stop();
        },
        async handleDrop(event) {
            this.dragActive = false;
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                const audioUrl = URL.createObjectURL(file);
                const audio = new Audio(audioUrl);
                audio.addEventListener('loadedmetadata', async () => {
                    const duration = audio.duration;
                    const start = duration > 5 ? duration - 5 : 0;
                    const blob = await this.sliceAudio(file, start, duration);
                    await this.sendAudiofile(blob);
                });
            }
        },
        async sliceAudio(file, start, end) {
            const audioContext = new AudioContext();
            const arrayBuffer = await file.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const sampleRate = audioBuffer.sampleRate;
            const startOffset = start * sampleRate;
            const endOffset = end * sampleRate;
            const frameCount = endOffset - startOffset;
            const newBuffer = audioContext.createBuffer(audioBuffer.numberOfChannels, frameCount, sampleRate);

            for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
                const newData = newBuffer.getChannelData(channel);
                const oldData = audioBuffer.getChannelData(channel);
                for (let i = 0; i < frameCount; i++) {
                    newData[i] = oldData[i + startOffset];
                }
            }

            const offlineContext = new OfflineAudioContext(
                newBuffer.numberOfChannels,
                newBuffer.length,
                newBuffer.sampleRate
            );
            const source = offlineContext.createBufferSource();
            source.buffer = newBuffer;
            source.connect(offlineContext.destination);
            source.start();
            const renderedBuffer = await offlineContext.startRendering();
            return new Blob([renderedBuffer], { type: 'audio/wav' });
        },
        async sendAudiofile(wavBlob) {
            console.log(this.recordingDeviceId);
            const timestamp = new Date().toISOString().replace(/:/g, '-');
            const formData = new FormData();
            formData.append('file', wavBlob, `recording-${timestamp}.wav`);

            try {
                const fileSaveRes = await Vue.reqFetch(
                    'POST',
                    'http://54.206.75.219:8080/files/upload',
                    {},
                    formData
                );

                const res = await Vue.reqFetch(
                    'POST',
                    'http://54.206.75.219:8080/soundData',
                    { 'Content-Type': 'application/json' },
                    {
                        filePath: fileSaveRes.filePath,
                        deviceId: this.recordingDeviceId,
                        userId: localStorage.getItem('userId'),
                    }
                );
            } catch (e) {
                console.error(e);
            }
        },
    },
    unmounted() {
        if (this.stream) {
            this.stream.getTracks().forEach((track) => track.stop());
        }
        this.mediaRecorder = null;
        this.stream = null;
    },
};
</script>

<style>
#onAirLight {
    color: red;
    font-weight: bold;
}

.recorderContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90vh;
}

.drag-drop-area {
    width: 90%;
    height: 200px;
    border: 2px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
</style>
