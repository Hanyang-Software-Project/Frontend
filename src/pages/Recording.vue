<template>
    <div class="recorderContainer">
        <h1 class="mb-5">Audio recording</h1>
        <button type="button" class="btn btn-success mb-2" :disabled="onAir" @click="startRecording">Start</button>
        <button type="button" class="btn btn-danger mt-2" :disabled="!onAir" @click="stopRecording">Stop</button>
        <p v-if="onAir" id="onAirLight">• on air</p>

        <!-- Drag-and-Drop Area -->
        <DragModal @audio-dropped="processAudioFile"/>
    </div>
</template>


<script>
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect, disconnect } from 'extendable-media-recorder-wav-encoder';
import Vue from 'vue';
import DragModal from './Recording/DragModal.vue';

export default {
    components: {
        DragModal,
    },
    data() {
        return {
            onAir: false,
            stream: null,
            mediaRecorder: null,
            audioChunks: [],
            loopEnabled: true,
            recordingDeviceId: Vue.getCookie('recordDeviceId'),
        };
    },
    async mounted() {
        await register(await connect());
    },
    async unmounted() {
        await register(await disconnect());
        this.cleanupStream();
    },
    methods: {
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
            this.onAir = false;
            this.loopEnabled = false;
            if (this.mediaRecorder) {
                this.mediaRecorder.stop();
            }
        },
        async sendAudiofile(wavBlob) {
            const formData = new FormData();
            formData.append('file', wavBlob);

            try {
                const fileSaveRes = await Vue.reqFetch(
                    'POST',
                    'http://3.24.110.71:8080/files/upload',
                    {},
                    formData
                );

                await Vue.reqFetch(
                    'POST',
                    'http://3.24.110.71:8080/soundData',
                    { 'Content-Type': 'application/json' },
                    {
                        filePath: fileSaveRes.fileName,
                        deviceId: this.recordingDeviceId,
                        userId: localStorage.getItem('userId'),
                    }
                );
            } catch (e) {
                console.error(e);
            }
        },
        async processAudioFile(file) {
            // Process file dropped in DragModal
            const audioBlob = new Blob([file], { type: file.type });
            await this.sendAudiofile(audioBlob);
        },
        cleanupStream() {
            if (this.stream) {
                this.stream.getTracks().forEach((track) => track.stop());
            }
            this.mediaRecorder = null;
            this.stream = null;
        },
    },
    unmounted() {
        this.cleanupStream();
    },
};
</script>


<style>
#onAirLight{
    color: red;
    font-weight: bold;
}

.recorderContainer{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90vh
}
</style>