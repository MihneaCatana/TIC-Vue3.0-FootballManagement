
<template>
  <Navbar/>
  <h1 style="text-align: center; margin-bottom: 2rem">{{league}}</h1>
  <Suspense>
    <template #fallback>
      <div>Loading...</div>
    </template>
    <div style="display: flex; justify-content: center" v-if="response.data">
      <div style="width: 90%">
        <v-data-table theme="dark"  :headers="headers" :items="leagues" ></v-data-table>
      </div>
    </div>
  </Suspense>
  <div style="margin-bottom: 5rem">

  </div>

</template>

<style scoped>

</style>




<script setup>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
const league = window.location.href.split('/')[window.location.href.split('/').length-1].replaceAll('%20',' ')
console.log(league)

let response = await axios.get(`http://localhost:8085/api/team/${league}`)
const leagues = response.data
console.log(response)

const headers = [
  {title:'Team', value:'name', key:'name'},
  {title: 'Manager', value: 'manager', key:'manager'},
  {title: 'Trophies', align:'center',
    children:
        [{title:'League', value:'trophies.league', key:'trophies.league'}, {title: 'Domestic Cup', value: 'trophies.domestic', key:'trophies.domestic'},{title: 'International', value: 'trophies.international', key:'trophies.international'}]} ]

</script>