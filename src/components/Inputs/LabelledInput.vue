<template>
    <div class="mb-3">
        <label class="form-label" :for="'input-' + label">
            {{ label }}
        </label>
        <input
        :type="inputType"
        :placeholder="inputPlaceHolder"
        @input="setModelValue($event.target.value)"
        v-model="modelValue"
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
        setModelValue(newValue) {
            this.$emit('update:modelValue', newValue);
        }
    }
}

/*interface Props{
    label: string,
    inputType: string,
    inputPlaceHolder: string
}
const props = defineProps<Props>()
const model = defineModel()*/
</script>
