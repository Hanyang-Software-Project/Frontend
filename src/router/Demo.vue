<template>
    <div>
        <button @click="startAlarm('demo1.wav')">
            First alarm
        </button>
        <button @click="startAlarm('demo2.wav')">
            Second alarm
        </button>
    </div>
</template>
<script>
import Vue from 'vue';

export default{
    methods: {
        async startAlarm(sounddata){
            await Vue.reqFetch(
                    'POST',
                    process.env.VUE_APP_URI_ROOT+'/alerts',
                    {'Content-Type': "Application/json"},
                    {filePath: sounddata}
                );
        }
    }
}
</script>