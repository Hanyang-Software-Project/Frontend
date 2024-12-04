<template>
    <div class="recorderContainer">
        <h1 class="mb-5">Audio recording</h1>
        <button type="button" class="btn btn-success mb-2" :disabled="onAir" @click="startRecording">Start</button>
        <button type="button" class="btn btn-danger mt-2" :disabled="!onAir" @click="stopRecording">Stop</button>
        <!--ul v-if="audioUrl != []">
            <li v-for="src in audioUrl" :ref="src">
                <audio controls :src="src"></audio>
            </li>
        </ul-->
        <!-- audio v-if="audioSrc !== ''" controls :src="audioSrc"></audio -->
        <p v-if="onAir" id="onAirLight">• on air</p>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                audioSrc: '',
                audioSrcArr: [],
                onAir: false,
                audioUrl: []
            }
        },
        mounted(){
            this.stream = null
            this.mediaRecorder = null
            this.loopEnabled = true
            this.audioChunks = []
        },
        methods: {
            async startRecording(){
                try{
                    this.stream = await navigator.mediaDevices.getUserMedia({audio: true})
                    this.mediaRecorder = new MediaRecorder(this.stream)

                    this.mediaRecorder.ondataavailable = event => {
                        this.audioChunks.push(event.data)
                        this.mediaRecorder.stop()
                    }

                    this.mediaRecorder.onstop = _ => {
                        const audioBlob = new Blob(this.audioChunks, {type: "audio/ogg"})
                        const audioLink = URL.createObjectURL(audioBlob)
                        this.audioSrc = audioLink
                        this.audioUrl.push(audioLink)
                        this.audioChunks = []
                        if(this.loopEnabled) this.mediaRecorder.start(5000)
                        console.log(this.audioUrl)
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