<script setup>
import { useField, useForm } from 'vee-validate'
import store from "@/store/index.js";
import router from "@/router/index.jsx";
import axios from "axios";

const { handleSubmit } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 6 || !store.state.registerMode) return true
      return 'Name needs to be at least 6 characters.'
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    },
    password(value) {
      if(value?.length >= 8) return true
      return 'Password needs to be at least 8 characters'
    }
  },
})
const name = useField('name')
const email = useField('email')
const password = useField('password')


const submit = handleSubmit(values => {

  if(store.state.registerMode){
    axios.post("http://localhost:8085/api/user/register", values).then(()=>{

      axios.post("http://localhost:8085/api/user/login", values).then((res)=>{
        localStorage.setItem('JWT', JSON.stringify(res.data.token))
        router.replace('/home')
      }).catch(err =>{
        alert(err)
      })
    }).catch(err =>{
      alert(err)
    })
  }
  else {
    axios.post("http://localhost:8085/api/user/login", values).then((res)=>{
      localStorage.setItem('JWT', JSON.stringify(res.data.token))
      localStorage.setItem('email', JSON.stringify(values.email))
      router.replace('/home')
    }).catch(err =>{
      alert(err)
    })
  }


})
</script>

<template>
  <div class="login">
    <div class="containerLogin">
      <div style="display: flex; justify-content: center; margin: 1rem 0">
      <img src="../assets/football.png" alt="football" width="55" height="55">
      </div>
      <form class="authForm"  @submit.prevent="submit">
        <v-text-field
            v-model="name.value.value"
            prepend-inner-icon="mdi-account"
            :error-messages="name.errorMessage.value"
            v-if="$store.state.registerMode"
            label="Name"
        ></v-text-field>
        <v-text-field
            v-model="email.value.value"
            prepend-inner-icon="mdi-email-outline"
            :error-messages="email.errorMessage.value"
            label="E-mail"
        ></v-text-field>
        <v-text-field
            v-model="password.value.value"
            prepend-inner-icon="mdi-lock-outline"
            :append-icon="$store.state.visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
            :error-messages="password.errorMessage.value"
            :type="$store.state.visiblePassword ? 'text' : 'password'   "
            @click:append="$store.commit('changeVisibility')"
            label="Password"
        ></v-text-field>
        <div style="display: flex; justify-content: center">
        <v-btn style="margin: 1rem 0" class="me-4" type="submit"> {{ $store.state.registerMode ? "Register" : "Login"}} </v-btn>
        </div>
        <v-card-text class="text-center" @click="$store.commit('changeRegisterMode')">
          <a
              class="text-blue text-decoration-none"
              href="#"
              rel="noopener noreferrer"
          >
            {{ $store.state.registerMode ? "Already have an account?" : "Create a new account"}}  <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>

      </form>
    </div>
  </div>
</template>

<style scoped>
.login{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

}

.containerLogin{
  width: 300px;
  padding: 0 1rem;
  height: 480px;
  background-color: #f2f4f5;
  border-radius: 4%;
  display: flex;
  flex-direction: column;
}

.containerLogin h2{
  color: #282828FF;
  text-align: center;
}

.authForm{
  color: #1e1d1d;
}
</style>