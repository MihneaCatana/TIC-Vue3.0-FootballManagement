<script>

import axios from "axios";

const item = localStorage.getItem('email')?.replace("\"", "")
const email = item?.substring(0, item.length - 1);

const dummyUser = {
  data: {
    name: "",
    email: "",
    role: "",
    creationDate: new Date()
  }
}

const user = email ? await axios.get(`http://localhost:8085/api/user/${email}`) : dummyUser

let file = null;
</script>

<template>
  <main>
    <Navbar/>
    <div class="profile_container">
      <div class="profile_card">

        <v-avatar
            color="grey"
            rounded="7"
            size="120"
            style="margin-top: 1rem"
        >
          <v-img cover src="https://xsgames.co/randomusers/avatar.php?g=male"></v-img>
        </v-avatar>
        <h2 style="margin-top: 1rem">Hello, {{ user.data.name }}!</h2>
        <div><b>Your email:</b> {{ user.data.email }}</div>
        <div><b>Role: </b>{{ user.data.role || 'DEFAULT' }}</div>
        <!--        <div style="width: 60%; margin-top: 2rem; margin-bottom: 1rem; max-height: 200px ">-->
        <!--          <v-file-input-->
        <!--              v-model="file"-->
        <!--              :rules="[value => !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!']"-->
        <!--              accept="image/png, image/jpeg"-->
        <!--              counter-->
        <!--              label="Pick an avatar"-->
        <!--              placeholder="Pick an avatar"-->
        <!--              show-size-->
        <!--              style="width: 250px; overflow: auto"-->
        <!--          ></v-file-input>-->
        <!--        </div>-->
        <!--        <v-btn @click="console.log(file)">-->
        <!--          Submit-->
        <!--        </v-btn>-->
        <!--        <div><b>Joined:</b> {{ new Date(user.data.creationDate.seconds * 1000).toLocaleDateString() }}</div>-->

      </div>

    </div>
  </main>
</template>

<style scoped>

.profile_container {
  display: flex;
  justify-content: center;
}

.profile_card {
  width: 340px;
  height: 500px;
  background-color: #f8f8f8;
  color: #282828;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
<script setup>
import Navbar from "@/components/Navbar.vue";

</script>