<template>
    <div class="mb-3">
        <label class="form-label" :for="'input-' + label">
            {{ label }}
        </label>
        <input
        :type="inputType"
        :placeholder="inputPlaceHolder"
        @input="handleInput($event)"
        :name="'input-' + label"
        class="form-control"
        />
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        inputType: String,
        inputPlaceHolder: String,
        modelValue: [String, Number]
    },
    methods: {
        handleInput(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>
