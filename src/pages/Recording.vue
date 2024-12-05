<template>
    <div class="recorderContainer">
        <h1 class="mb-5">Audio recording</h1>
        <button type="button" class="btn btn-success mb-2" :disabled="onAir" @click="startRecording">Start</button>
        <button type="button" class="btn btn-danger mt-2" :disabled="!onAir" @click="stopRecording">Stop</button>
        <p v-if="onAir" id="onAirLight">• on air</p>
    </div>
</template>
<script>
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect, disconnect } from 'extendable-media-recorder-wav-encoder';
import Vue from 'vue';

    export default{
        data(){
            return {
                onAir: false,
            }
        },
        async mounted(){
            this.stream = null
            this.mediaRecorder = null
            this.audioChunks = []
            this.loopEnabled = true
            this.recordingDeviceId = Vue.getCookie('recordDeviceId')
            await register(await connect())
        },
        async unMounted(){
            await register(await disconnect())
        },
        methods: {
            async startRecording(){
                try{

                    this.stream = await navigator.mediaDevices.getUserMedia({audio: true})
                    this.mediaRecorder = new MediaRecorder(this.stream, {mimeType: 'audio/wav'})

                    this.mediaRecorder.ondataavailable = event => {
                        this.audioChunks.push(event.data)
                        this.mediaRecorder.stop()
                    }

                    this.mediaRecorder.onstop = async _ => {
                        const audioBlob = new Blob(this.audioChunks, {type: "audio/wav"})

                        await this.sendAudiofile(audioBlob)

                        this.audioChunks = []
                        if(this.loopEnabled) this.mediaRecorder.start(5000)
                    }

                    this.mediaRecorder.start(5000)
                    this.onAir = true
                } catch(e){
                    console.log('Err:', e)
                }

            },

            stopRecording(){
                this.onAir = this.loopEnabled = false
                this.mediaRecorder.stop()
            },

            async sendAudiofile(wavBlob){
                console.log(this.recordingDeviceId)
                const formData = new FormData()
                formData.append('file', wavBlob)
                console.log(formData)

                try{
                    const fileSaveRes = await Vue.reqFetch(
                        'POST',
                        'http://localhost:8080/files/upload',
                        {},
                        formData
                    );

                    const res = await Vue.reqFetch(
                        'POST',
                        'http://localhost:8080/soundData',
                        {'Content-Type': 'application/json'},
                        {
                            filePath: fileSaveRes.filePath,
                            deviceId: this.recordingDeviceId,
                            userId: localStorage.getItem('userId')
                        }
                    )
                }catch(e){
                    console.log(e)
                }
            }
        },
        unMounted(){
            this.stream.getTracks().forEach(track => track.stop())
            this.mediaRecorder = null
            this.stream = null
        }
    }
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