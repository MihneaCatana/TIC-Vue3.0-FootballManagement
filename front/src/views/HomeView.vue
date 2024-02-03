<script setup>
import Navbar from "@/components/Navbar.vue";
import LatestTransfers from "@/components/LatestTransfers.vue";
import axios from "axios";
import ListPlayers from "@/components/ListPlayers.vue";


const apiPlayers = await axios.get("http://localhost:8085/api/player")
const players = apiPlayers.data

function comparePlayersByGoals(a, b) {
  return b.stats.goals - a.stats.goals
}

function comparePlayersByScore(a, b) {
  return b.stats.averageScore - a.stats.averageScore
}

function comparePlayersByMarketValue(a, b) {
  return b.marketValue - a.marketValue
}

const playersCopy = [...players]
playersCopy.sort(comparePlayersByGoals)
const topGoalscorers = playersCopy.slice(0, 5)

playersCopy.sort(comparePlayersByScore)
const topPlayers = playersCopy.slice(0, 5)

playersCopy.sort(comparePlayersByMarketValue)

const topValuePlayers = playersCopy.slice(0, 5)


//filter latest transfers by marketValue

const transfers = playersCopy.filter(player => player.pastTeams[1].year === 2023).slice(0, 10)
const testData = [{name: 'Robert'}, {
  name: 'Esteban'
}, {name: 'Mario'}, {name: 'Albert'}]

</script>

<template>
  <main>
    <Navbar/>
    <LatestTransfers :items="transfers"/>
    <div style="display: flex; flex-wrap: wrap; justify-content: center">
      <div class="listContainer">
        <ListPlayers :items="topGoalscorers" style="margin-bottom: 4rem" title="Best Goalscorers"/>
      </div>
      <div class="listContainer">
        <ListPlayers :items="topPlayers" style="margin-bottom: 4rem" title="Best Players"/>
      </div>
      <div class="listContainer">
        <ListPlayers :items="topValuePlayers" style="margin-bottom: 4rem" title="Most Valuables"/>
      </div>
    </div>
  </main>
</template>
<style>

.listContainer {
  width: 30%;
  min-width: 420px;
}
</style>
