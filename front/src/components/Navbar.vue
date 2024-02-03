<script setup>

import router from "@/router/index.jsx";

function changePage(route) {
  if (route === 'logout') {
    localStorage.clear();
    router.replace("/login");
  } else router.replace("/" + route);
}

</script>

<template>
  <main>
    <v-layout class="overflow-visible" style="height: 56px;">
      <v-bottom-navigation
          mode="shift"
          style="background-color: brown"
      >
        <v-btn class="menu_item_btn" @click="changePage('home')">
          <v-icon>mdi-newspaper</v-icon>

          <span>Home</span>
        </v-btn>
        <!--De modificat ???-->
        <v-btn class="menu_item_btn" @click="changePage('admin')">
          <v-icon>mdi-account-group</v-icon>

          <span>Admin</span>
        </v-btn>

        <v-btn class="menu_item_btn" @click="changePage('competitions')">
          <v-icon>mdi-trophy</v-icon>

          <span>Competitions</span>
        </v-btn>
        <v-btn class="menu_item_btn" @click="changePage('profile')">
          <v-icon>mdi-account</v-icon>
          <span>Profile</span>
        </v-btn>
        <v-btn class="menu_item_btn" @click="changePage('logout')">
          <v-icon>mdi-exit-to-app</v-icon>

          <span>Logout</span>
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </main>
</template>

<style scoped>

.menu_item_btn span {
  color: #1e1d1d;
  opacity: 1 !important;
}

.v-btn--stacked.v-btn--size-default {
  padding: 0 !important;
}
</style>