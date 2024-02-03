<script setup>

const props = defineProps({
  items: Array,
  title: String
})

function convertToInternationalCurrencySystem(labelValue) {

  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

      ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
      // Six Zeroes for Millions
      : Math.abs(Number(labelValue)) >= 1.0e+6

          ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
          // Three Zeroes for Thousands
          : Math.abs(Number(labelValue)) >= 1.0e+3

              ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

              : Math.abs(Number(labelValue));

}

</script>

<template>
  <v-data-iterator
      :items="items"
      item-value="name"
  >

    <template v-slot:default="{ items, isExpanded, toggleExpand }" style="width: 800px">
      <div>
        <div md="4" style="text-align: center; font-size: 20px; width: 100% ">{{ title }}</div>
        <div
            v-for="item in items"
            :key="item.raw.name"
            style="display: flex;justify-content: center; margin: 1rem 0; min-width: 300px"

        >
          <v-card width="350px">
            <v-card-title class="d-flex align-center">
              <h4>{{ item.raw.name }}</h4>
            </v-card-title>

            <div class="px-4">
              <v-switch
                  :label="`${isExpanded(item) ? 'Hide' : 'Show'} details`"
                  :model-value="isExpanded(item)"
                  density="compact"
                  inset
                  @click="() => toggleExpand(item)"
              ></v-switch>
            </div>

            <v-divider></v-divider>


            <v-expand-transition>
              <div v-if="isExpanded(item)">
                <v-list :lines="false" density="compact">
                  
                  <v-list-item :title="`♣️ Club: ${item.raw.currentClub}`" active></v-list-item>
                  <v-list-item
                      :title="`💰 Market Value: ${ convertToInternationalCurrencySystem(item.raw.marketValue)}`"></v-list-item>
                  <v-list-item
                      :title="`⏳ Birthdate: ${ new Date(item.raw.birthdate.seconds*1000).toLocaleDateString()}`"></v-list-item>
                  <v-list-item :title="`🌍 Nationality: ${item.raw.nationality}`"></v-list-item>
                  <v-list-item :title="`⚽ Goals: ${item.raw.stats.goals}`"></v-list-item>
                  <v-list-item :title="`⭐ Average Score: ${item.raw.stats.averageScore}`"></v-list-item>
                  <v-list-item :title="`🏟️ Position: ${item.raw.position}`"></v-list-item>
                </v-list>
              </div>
            </v-expand-transition>
          </v-card>
        </div>
      </div>
    </template>

  </v-data-iterator>
</template>

<style scoped>

</style>