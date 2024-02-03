import {createStore} from "vuex"
import router from "@/router/index.jsx";

export default createStore({
    state:{
        visiblePassword: false,
        registerMode: true,
    },
    mutations:{
       changeVisibility(state){
         state.visiblePassword = !state.visiblePassword;
       },
       changeRegisterMode(state){
           state.registerMode = !state.registerMode
       },

    },
    actions:{

    },
    getters:{

    },
    modules:{

    }
})