<script>

  import axios from "axios";

 const apiTeams = await axios.get("http://localhost:8085/api/team")

  const teams = apiTeams.data
  const leagues = Object.groupBy(teams,({league})=>league.name)

</script>

<template>
  <main>
    <Navbar/>

    <div class="leagueContainer">
    <div class="leagueCard" v-for="league in Object.entries(leagues)" :key="league[0]" @click=" router.replace('/league/'+ league[0])" >
      <img class="imageLeagueCard" alt="Logo" :src="faker.image.urlLoremFlickr({ category: 'city',height:160, width:160 })" />
      {{league[0]}}
    </div>
    </div>


  </main>
</template>

<style scoped>

  .leagueContainer{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 3rem;
    margin-left: 10%;
    margin-right: 10%;
  }

  .leagueCard{
      width: 300px;
      height: 400px;
    margin: 1.5rem;
    background-color: #f8f8f8;
    color: #282828;
    font-size: 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 4%;
  }

  .leagueCard:hover{
    cursor: pointer;
    transform: scale(1.1);
    transition: 0.5s ;
  }

  .imageLeagueCard{
    margin-bottom: 2rem;
    border-radius: 20%;
  }

</style>
<script setup>
import Navbar from "@/components/Navbar.vue";
import {faker} from "@faker-js/faker";
import router from "@/router/index.jsx";
</script>