<template>
    <div class="drag-drop-area" 
         @dragover.prevent 
         @dragenter.prevent="highlight" 
         @dragleave="unhighlight" 
         @drop.prevent="handleDrop">
        <p>Drag and drop an audio file here</p>
        <p v-if="uploading">Uploading...</p>
        <p v-if="uploadError" class="error-text">Error: {{ uploadError }}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dragActive: false,
            uploading: false,
            uploadError: null,
        };
    },
    methods: {
        highlight() {
            this.dragActive = true;
        },
        unhighlight() {
            this.dragActive = false;
        },
        async handleDrop(event) {
            this.dragActive = false;
            const files = event.dataTransfer.files;

            if (files.length > 0) {
                const file = files[0];

                if (file.type.startsWith("audio/")) {
                    this.uploadError = null;
                    this.uploading = true;

                    try {
                        await this.uploadAndProcessAudioFile(file);
                        this.uploading = false;
                    } catch (error) {
                        this.uploading = false;
                        this.uploadError = error.message || "Failed to upload audio file.";
                    }
                } else {
                    this.uploadError = "Please upload a valid audio file.";
                }
            }
        },
        async uploadAndProcessAudioFile(file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                // Step 1: Upload file
                const uploadResponse = await fetch("http://52.62.128.15:8080/files/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    throw new Error(`Upload failed with status ${uploadResponse.status}`);
                }

                const fileSaveRes = await uploadResponse.json();

                // Step 2: Send metadata to process the file
                const soundDataResponse = await fetch("http://52.62.128.15:8080/soundData", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        filePath: fileSaveRes.filePath,
                        deviceId: Vue.getCookie("recordDeviceId"),
                        userId: localStorage.getItem("userId"),
                    }),
                });

                if (!soundDataResponse.ok) {
                    throw new Error(`Processing failed with status ${soundDataResponse.status}`);
                }

                console.log("Audio file processed successfully");
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    },
};
</script>


<style scoped>
.drag-drop-area {
    width: 90%;
    height: 200px;
    border: 2px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    background-color: #f9f9f9;
    transition: background-color 0.3s;
}

.drag-drop-area:hover {
    background-color: #e8f5e9;
}

.error-text {
    color: red;
    font-weight: bold;
    margin-top: 10px;
}
</style>
