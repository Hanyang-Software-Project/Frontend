<template>
    <div>
        <h1>Audio recording</h1>
        <button :disabled="onAir" @click="startRecording">Start</button>
        <button :disabled="!onAir" @click="stopRecording">Stop</button>
        <!-- ul v-if="audioSrcArr != []">
            <li v-for="src in audioSrcArr">
                <audio controls :src="src"></audio>
            </li>
        </ul -->
        <audio v-if="audioSrc !== ''" controls :src="audioSrc"></audio>
        <p v-if="onAir" id="onAirLight">• on air</p>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                audioSrc: '',
                audioSrcArr: [],
                onAir: false
            }
        },
        async mounted(){
            this.stream = null
            this.mediaRecorder = null
            this.audioChunks = [];
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
                        this.audioSrc = URL.createObjectURL(audioBlob)
                        this.audioChunks = []
                        this.onAir = false
                        this.mediaRecorder.start(5000)
                    }

                    this.mediaRecorder.start(5000)
                    this.onAir = true
                } catch(e){
                    console.log('Err:', e)
                }

            },

            stopRecording(){
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
</style>