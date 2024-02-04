<script setup>

import Navbar from "@/components/Navbar.vue";
import CardAdminTeam from "@/components/CardAdminTeam.vue"
import CardAdminUser from "@/components/CardAdminUser.vue"

// const apiPlayers = await axios.get("http://localhost:8085/api/player")
// const players = apiPlayers.data
//
const apiTeams = await axios.get("http://localhost:8085/api/team")
const teams = apiTeams.data
//
const apiUsers = await axios.get("http://localhost:8085/api/user/users/all")
const users = apiUsers.data

let firstName = ref('')
let marketValue = ref(null)
let nationality = ref(null)
let currentClub = ref(null)
let position = ref(null)
let birthdate = ref(null)

let manager = ref('')
let clubName = ref('')
let tier = ref(null)
let nation = ref(null)

let teamsNames = teams.map(team => team.name)
teamsNames.push('FREE AGENT')

async function addPlayer() {

  if (firstName.value.length > 3 && marketValue.value && nationality.value && currentClub.value && position.value && birthdate.value) {
    const JWT = localStorage.getItem('JWT')?.replaceAll('"', '')

    try {
      await axios.post("http://localhost:8085/api/player/add", {
        name: firstName.value,
        birthdate: birthdate.value,
        nationality: nationality.value,
        marketValue: marketValue.value,
        position: position.value
      }, {
        headers: {
          "authorization": JWT
        }
      })
      window.location.reload()
    } catch (e) {
      console.log(e)
      router.replace("/login")
    }
  }
}

async function addTeam() {

  if (clubName.value.length > 3 && manager.value.length > 3 && nation.value && tier.value) {
    const JWT = localStorage.getItem('JWT')?.replaceAll('"', '')

    try {
      await axios.post("http://localhost:8085/api/team/add", {
        name: clubName.value,
        manager: manager.value,
        league: {
          name: nation.value + " League",
          nation: nation.value,
          tier: tier.value
        },
        trophies: {domestic: 0, international: 0, league: 0},
      }, {
        headers: {
          "authorization": JWT
        }
      })
      window.location.reload()
    } catch (e) {
      console.log(e)
      router.replace("/login")
    }
  }
}


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
  {title: 'League', value: 'league.name', key: 'league'},
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

async function deleteTeam() {

  const JWT = localStorage.getItem('JWT').replaceAll('"', '')
  console.log(JWT)

  try {
    await axios.delete(`http://localhost:8085/api/team/${teamToDelete.value.id}`, {
      headers: {
        "authorization": JWT
      }
    })
    window.location.reload()

  } catch (e) {
    console.log(e)
    await router.replace("/login");
  }

  dialogDeleteTeam.value = false;
}

async function deletePlayer() {

  const JWT = localStorage.getItem('JWT').replaceAll('"', '')
  console.log(JWT)

  try {
    await axios.delete(`http://localhost:8085/api/player/${playerToDelete.value.id}`, {
      headers: {
        "authorization": JWT
      }
    })
    window.location.reload()

  } catch (e) {
    console.log(e)
    await router.replace("/login");
  }

  dialogDeletePlayer.value = false;
}

const dialogAdd = ref(false)
const dialogAddTeam = ref(false)
let searchUser = ''
let searchPlayer = ''
let searchTeam = ref('')
</script>

<template>
  <Navbar/>
  <div class="containerAdmin">
    <!--    <CardAdminPlayer-->
    <!--        @click="playerTableVisible = !playerTableVisible; userTableVisible=false; teamTableVisible = false;"/>-->
    <CardAdminTeam @click="teamTableVisible = !teamTableVisible; userTableVisible=false; playerTableVisible = false; "/>
    <CardAdminUser
        @click="userTableVisible = !userTableVisible; teamTableVisible = false; playerTableVisible = false;"/>
    <!--    <CardAdminLeagues/>-->
  </div>
  <div style="display: flex; justify-content: center">

    <v-btn
        color="primary"
        style="margin-bottom: 2rem"
        @click="dialogAdd = true"
    >
      Add Player
    </v-btn>

    <v-dialog
        v-model="dialogAdd"
        persistent
        width="auto"
    >
      <v-card>
        <v-card-text style="width: 400px">
          <h4 style="text-align: center; margin-bottom: 1.2rem">Add Player</h4>
          <v-form @submit="addPlayer" @submit.prevent>
            <v-text-field
                v-model="firstName"
                :rules="[value => value.length>3 || 'Minimum 4 characters']"
                label="Name"
            ></v-text-field>

            <v-combobox
                v-model="nationality"
                :items="['Albania','Argentina', 'Austria', 'Canada','Germany','Romania','Spain','Portugal']"
                :rules="[value => !!value || 'Nationality is required']"
                label="Nationality"
            ></v-combobox>
            <v-combobox
                v-model="position"
                :items="['Attacker','Midfielder','Defender','Goalkeeper']"
                :rules="[value => !!value || 'Position is required']"
                label="Position"
            ></v-combobox>
            <v-text-field
                v-model="marketValue"
                :rules="[value => !!value || 'Market Value is required']"
                hide-details
                label="MarketValue"
                type="number"
            />
            <v-combobox
                v-model="currentClub"
                :items="teamsNames"
                :rules="[value => !!value || 'Current Club is required']"
                label="Current Club"
                style="margin-top: 1.2rem"
            ></v-combobox>

            <v-date-picker
                v-model="birthdate"
                :rules="[value => value.length>3 || 'Birthdate mandatory ']"
                color="primary"
                style="margin-top: 1.2rem;"
            ></v-date-picker>
            <v-btn block class="mt-2" type="submit">Submit</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="primary" @click="dialogAdd = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn
        color="primary"
        style="margin-left: 1.3rem; margin-bottom: 2rem"
        @click="dialogAddTeam = true"
    >
      Add Team
    </v-btn>

    <v-dialog
        v-model="dialogAddTeam"
        persistent
        width="auto"
    >

      <v-card>
        <v-card-text style="width: 400px">
          <v-form @submit="addTeam" @submit.prevent>
            <h4 style="text-align: center; margin-bottom: 1.2rem">Add Team</h4>
            <v-text-field
                v-model="clubName"
                :rules="[value => value.length>3 || 'Minimum 4 characters']"
                label="Name of the club"
            ></v-text-field>
            <v-text-field
                v-model="manager"
                :rules="[value => value.length>3 || 'Minimum 4 characters']"
                label="Name of the manager"
            ></v-text-field>
            <v-combobox
                v-model="nation"
                :items="['Albania','Argentina', 'Austria', 'Canada','Germany','Romania','Spain','Portugal']"
                :rules="[value => !!value || 'Nation is required']"
                label="Nation"
                style="margin-top: 1.2rem"
            ></v-combobox>
            <v-combobox
                v-model="tier"
                :items="['First Tier','Second Tier', 'Third Tier']"
                :rules="[value => !!value || 'Tier is required']"
                label="Nation"
                style="margin-top: 1.2rem"
            ></v-combobox>
            <v-btn block class="mt-2" type="submit">Submit</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="primary" @click="dialogAddTeam = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>


  <!-- USER PANEL -->
  <div style="display: flex; justify-content: center">

    <div style="width: 80%">
      <v-text-field
          v-model="searchUser"
          :style=" userTableVisible ? 'display:block' : 'display:none' "
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
      ></v-text-field>
      <v-data-table :headers="headersUser" :items="users" :search="searchUser"
                    :style=" userTableVisible ? 'display:block' : 'display:none' "
                    style="margin-bottom: 3.9rem; overflow-x: auto" theme="dark">

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
        </v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- TEAM PANEL -->
  <div style="display: flex; justify-content: center">
    <div style="width: 80%">
      <v-text-field
          v-model="searchTeam"
          :style=" teamTableVisible ? 'display:block' : 'display:none' "
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
      ></v-text-field>
      <v-data-table :headers="headersTeam" :items="teams" :search="searchTeam"
                    :style=" teamTableVisible ? 'display:block' : 'display:none' "
                    style="margin-bottom: 3.9rem; overflow-x: auto"
                    theme="dark">

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
            @click="deleteTeam"
        >OK
        </v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!--  &lt;!&ndash; PLAYER PANEL &ndash;&gt;-->
  <!--  <div style="display: flex; justify-content: center">-->
  <!--    <div style="width: 80%">-->

  <!--      <v-data-table :headers="headersPlayer" :items="players"-->
  <!--                     theme="dark"  :style=" playerTableVisible ? 'display:block' : 'display:none' "-->
  <!--                    style="margin-bottom: 3.9rem; overflow-x: auto">-->

  <!--        <template v-slot:item.actions="{ item }">-->
  <!--          <v-icon size="small" @click="dialogDeletePlayer = true; playerToDelete=item"> mdi-delete</v-icon>-->
  <!--        </template>-->
  <!--      </v-data-table>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--  <v-dialog v-model="dialogDeletePlayer" max-width="500px">-->

  <!--    <v-card>-->
  <!--      <v-card-title class="text-h5"-->
  <!--      >Are you sure you want to delete this item?-->
  <!--      </v-card-title-->
  <!--      >-->
  <!--      <v-card-actions>-->
  <!--        <v-spacer></v-spacer>-->
  <!--        <v-btn color="blue-darken-1" variant="text" @click="dialogDeletePlayer = false"-->
  <!--        >Cancel-->
  <!--        </v-btn-->
  <!--        >-->
  <!--        <v-btn-->
  <!--            color="blue-darken-1"-->
  <!--            variant="text"-->
  <!--            @click="deletePlayer"-->
  <!--        >OK-->
  <!--        </v-btn> &lt;!&ndash;       DE MODIFICAT CU FUNCTIA DE STERGERE  &ndash;&gt;-->

  <!--        <v-spacer></v-spacer>-->
  <!--      </v-card-actions>-->
  <!--    </v-card>-->
  <!--  </v-dialog>-->

</template>

<style scoped>
.containerAdmin {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>