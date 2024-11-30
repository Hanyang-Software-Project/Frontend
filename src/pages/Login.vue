<template>
    <div id="loginForm" class="formContainer">
        <FormComponent
        title="Login" submit-text="Login"
        :onSubmit="onLoginFormSubmit"
        >
            <LabelledInput input-type="text" label="Email / ID" input-place-holder="myaddress@mail.com" v-model="emailOrId"/>
            <LabelledInput input-type="password" label="Password" input-place-holder="**********" v-model="password"/>
        </FormComponent>
        <div class="loginLink">
          <router-link :to="{name: 'signinPage'}">Create account</router-link>
        </div>
      </div>
</template>
<script>
import FormComponent from '@/components/FormComponent.vue';
import LabelledInput from '@/components/Inputs/LabelledInput.vue';

export default{
  components: {
    FormComponent,
    LabelledInput
  },
  data(){
    return {
      emailOrId: '',
      password: ''
    }
  },
  methods: {
    onLoginFormSubmit(){
      const body = {
        email: emailOrId.value,
        password: password.value
      }
      fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(jsonRes => {
        if(jsonRes.code == 200)
          this.$router.push('dashboardLayout')
        else
          console.log("Err : " + jsonRes)
      })
    }
  }
}
</script>
