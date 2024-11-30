<template>
    <div class="loginSigninForms">
        <h1 class="mb-5" id="formComponentTitle">{{ title }}</h1>
        <form action="" @submit.prevent="onSubmit">
            <slot></slot>
            <button class="btn btn-primary">{{ submitText }}</button>
        </form>
    </div>
</template>
<script>
    export default{
        props: {
            title: String,
            submitText: String,
            onSubmit: Function
        }
    }
    /*interface Props{
        title: string,
        submitText: string,
        onSubmit: () => void
    }
    const props = defineProps<Props>()*/
</script>

<style>
#formComponentTitle{
    font-size: 3.5em;
}

form{
    width: 60%;
    max-width: 550px;
}
</style>