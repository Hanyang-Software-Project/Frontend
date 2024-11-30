<template>
    <div id="signinForm" class="formContainer">
        <FormComponent
        title="Create account" submit-text="Sign in"
        :onSubmit="onSigninFormSubmit"
        >
            <LabelledInput input-type="text" label="Username" input-place-holder="myUsername" v-model="username" />
            <LabelledInput input-type="text" label="Email" input-place-holder="myaddress@mail.com" v-model="email"/>
            <LabelledInput input-type="password" label="Password" input-place-holder="**********" v-model="password"/>
        </FormComponent>
        <div class="loginLink">
          <router-link :to="{name: 'loginPage'}">I already have an account</router-link>
        </div>
    </div>
</template>
<script>
import FormComponent from '@/components/FormComponent.vue';
import LabelledInput from '@/components/Inputs/LabelledInput.vue';

export default{
  components: {
    FormComponent, LabelledInput
  },
  data() {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    onSigninFormSubmit(){
      this.$router.push({name: 'loginPage'})
      return;
      const body = {
        email: email.value,
        username: username.value,
        password: password.value
      }

      fetch('http://192.168.232.128/signup.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes)
        if(jsonRes.code == 201)
          this.$router.push({name: 'loginPage'})
        else
          console.log('error: ' + jsonRes)
      })
    }
  }
}

/* const email : Ref<string> = ref('')
const username : Ref<string> = ref('')
const password : Ref<string> = ref('')

const onSigninFormSubmit = () : void => {
    const body : {email: string, username: string ,password: string} = {
      email: email.value,
      username: username.value,
      password: password.value
    }
    fetch('http://192.168.232.128/signup.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(jsonRes => {
      console.log(jsonRes)
      if(jsonRes.code == 201) window.location.href = "http://localhost:5173/"

      else console.log(jsonRes)
    })
}*/
</script>
