<template>
    <div id="loginForm" class="formContainer">
        <FormComponent
        title="Login" submit-text="Login"
        :onSubmit="onLoginFormSubmit"
        >
            <LabelledInput input-type="text" label="Email / ID" input-place-holder="myaddress@mail.com" @update:modelValue="emailOrId = $event"/>
            <LabelledInput input-type="password" label="Password" input-place-holder="**********" @update:modelValue="password = $event"/>
        </FormComponent>
        <div class="loginLink">
          <router-link :to="{name: 'signinPage'}">Create account</router-link>
        </div>
      </div>
</template>
<script>
import FormComponent from '@/components/FormComponent.vue';
import LabelledInput from '@/components/Inputs/LabelledInput.vue';
import Vue from 'vue';

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
    async onLoginFormSubmit(){
      try{
        const body = {
          email: this.emailOrId,
          password: this.password
        }

        const apiRes = await Vue.reqFetch(
          'POST',
          'http://52.62.128.15:8080/login',
          {'Content-Type': 'application/json'},
          body
        );
        console.log()
        const firebaseRes = await Vue.reqFetch(
          'POST',
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=' + process.env.VUE_APP_GOOGLE_API_KEY,
          {'Content-Type': 'application/json'},
          {
            token: apiRes.token,
            returnSecureToken: true
          }
        );

        localStorage.setItem('authToken', firebaseRes.idToken)
        this.$router.push({name: 'dashboardLayout'})
      }catch(e){
        console.log(e)
      }
    }
  }
}
</script>
