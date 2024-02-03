import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//store
import store from "./store/index.js"

const vuetify = createVuetify({
    components,
    directives,
})

import router from './router/index.jsx'

const app = createApp(App).use(vuetify)

app.use(router)
app.use(store)

app.mount('#app')
