<script setup>
const props = defineProps({
  items: Array,
})
</script>

<template>
  <h1 style="text-align: center">Latest Transfers</h1>
  <div style="display: flex; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem; margin-top: 2rem">
    <v-card v-for="item in items" :subtitle="'Transfer fee: ' + Math.floor(Math.random() * (100 - 1) + 1) + 'M' "
            :title="item.pastTeams[1].team  + ' -> ' + item?.currentClub"
            style="margin: 1rem 1.2rem"
            width="300">

      <div style="display: flex; justify-content: center">
        <img
            :src="'https://xsgames.co/randomusers/assets/avatars/male/'+Math.floor(Math.random() * (77 - 1) + 1)+'.jpg'"
            alt="playerFace" height="100" style="border-radius: 25%" width="100">
      </div>
      <p style="text-align: center; margin-bottom: 1rem">{{ item.name }}</p>
    </v-card>
  </div>
</template>

<style scoped>

</style>