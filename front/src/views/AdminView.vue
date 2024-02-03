<script setup>

import Navbar from "@/components/Navbar.vue";
import CardAdminPlayer from "@/components/CardAdminPlayer.vue";
import CardAdminTeam from "@/components/CardAdminTeam.vue"
import CardAdminUser from "@/components/CardAdminUser.vue"
import axios from "axios";


const apiPlayers = await axios.get("http://localhost:8085/api/player")
const players = apiPlayers.data

const apiTeams = await axios.get("http://localhost:8085/api/team")
const teams = apiTeams.data

const apiUsers = await axios.get("http://localhost:8085/api/user/users/all")
const users = apiUsers.data

</script>

<script>

import {ref} from "vue";
import axios from "axios";
import router from "@/router/index.jsx";

const headersUser = [
  {title: 'Id', value: 'id', key: 'id'},
  {title: 'Name', value: 'name', key: 'name'},
  {title: 'Email', value: 'email', key: 'email'},
  {title: 'Actions', key: 'actions', sortable: false}
]

const headersTeam = [
  {title: 'Id', value: 'id', key: 'id'},
  {title: 'Name', value: 'name', key: 'name'},
  {title: 'League', value: 'league', key: 'league'},
  {title: 'Manager', value: 'manager', key: 'manager'},
  {title: 'Actions', key: 'actions', sortable: false}
]

const headersPlayer = [
  {title: 'Id', value: 'id', key: 'id'},
  {title: 'Name', value: 'name', key: 'name'},
  {title: 'Birthdate', value: 'birthdate', key: 'birthdate'},
  {title: 'Nationality', value: 'nationality', key: 'nationality'},
  {title: 'Market Value', value: 'marketValue', key: 'marketValue'},
  {title: 'Club', value: 'currentClub', key: 'currentClub'},
  {title: 'Position', value: 'position', key: 'position'},
  {title: 'Actions', key: 'actions', sortable: false}
]

const userTableVisible = ref(false);
const teamTableVisible = ref(false);
const playerTableVisible = ref(false);

let dialogDeleteUser = ref(false);
const dialogDeleteTeam = ref(false);
const dialogDeletePlayer = ref(false);

const userToDelete = ref(null)
const teamToDelete = ref(null)
const playerToDelete = ref(null)


async function deleteUser() {

  const JWT = localStorage.getItem('JWT').replaceAll('"', '')
  console.log(JWT)

  try {
    await axios.delete(`http://localhost:8085/api/user/${userToDelete.value.id}`, {
      headers: {
        "authorization": JWT
      }
    })
    window.location.reload()

  } catch (e) {
    console.log(e)
    await router.replace("/login");
  }
  
  dialogDeleteUser.value = false;
}

</script>

<template>
  <Navbar/>
  <div class="containerAdmin">
    <CardAdminPlayer
        @click="playerTableVisible = !playerTableVisible; userTableVisible=false; teamTableVisible = false;"/>
    <CardAdminTeam @click="teamTableVisible = !teamTableVisible; userTableVisible=false; playerTableVisible = false; "/>
    <CardAdminUser
        @click="userTableVisible = !userTableVisible; teamTableVisible = false; playerTableVisible = false;"/>
    <!--    <CardAdminLeagues/>-->
  </div>
  <div style="display: flex; justify-content: center">
    <v-btn class="mb-2" color="primary" dark>
      Add new Item
    </v-btn>
  </div>

  <!-- USER PANEL -->
  <div style="display: flex; justify-content: center">
    <div style="width: 80%">

      <v-data-table :headers="headersUser" :items="users"
                    :style=" userTableVisible ? 'display:block' : 'display:none' "
                    style="margin-bottom: 3.9rem; overflow-x: auto">

        <template v-slot:item.actions="{ item }">
          <v-icon size="small" @click="dialogDeleteUser = true; userToDelete=item"> mdi-delete</v-icon>
        </template>
      </v-data-table>
    </div>
  </div>

  <v-dialog v-model="dialogDeleteUser" max-width="500px">

    <v-card>
      <v-card-title class="text-h5"
      >Are you sure you want to delete this item?
      </v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialogDeleteUser = false"
        >Cancel
        </v-btn
        >
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="deleteUser"
        >OK
        </v-btn> <!--       DE MODIFICAT CU FUNCTIA DE STERGERE  -->

        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- TEAM PANEL -->
  <div style="display: flex; justify-content: center">
    <div style="width: 80%">
      <v-data-table :headers="headersTeam" :items="teams"
                    :style=" teamTableVisible ? 'display:block' : 'display:none' "
                    style="margin-bottom: 3.9rem; overflow-x: auto">

        <template v-slot:item.actions="{ item }">
          <v-icon size="small" @click="dialogDeleteTeam = true; teamToDelete=item"> mdi-delete</v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
  <v-dialog v-model="dialogDeleteTeam" max-width="500px">
    <v-card>
      <v-card-title class="text-h5"
      >Are you sure you want to delete this item?
      </v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialogDeleteTeam = false"
        >Cancel
        </v-btn
        >
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="console.log(teamToDelete); dialogDeleteTeam= false;"
        >OK
        </v-btn> <!--       DE MODIFICAT CU FUNCTIA DE STERGERE  -->

        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- PLAYER PANEL -->
  <div style="display: flex; justify-content: center">
    <div style="width: 80%">

      <v-data-table :headers="headersPlayer" :items="players"
                    :style=" playerTableVisible ? 'display:block' : 'display:none' "
                    style="margin-bottom: 3.9rem; overflow-x: auto">

        <template v-slot:item.actions="{ item }">
          <v-icon size="small" @click="dialogDeletePlayer = true; playerToDelete=item"> mdi-delete</v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
  <v-dialog v-model="dialogDeletePlayer" max-width="500px">

    <v-card>
      <v-card-title class="text-h5"
      >Are you sure you want to delete this item?
      </v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialogDeletePlayer = false"
        >Cancel
        </v-btn
        >
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="console.log(playerToDelete); dialogDeletePlayer= false;"
        >OK
        </v-btn> <!--       DE MODIFICAT CU FUNCTIA DE STERGERE  -->

        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<style scoped>
.containerAdmin {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>