import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfileView.vue')
    },
    {
      path:'/admin',
      name:'admin',
      component: () => import('../views/AdminView.vue')
    },
    {
      path:'/competitions',
      name:'competitions',
      component: () => import('../views/CompetitionsView.vue')
    },
    {
      path:'/league/:leagueName',
      name:'league',
      component: () => import('../views/LeagueView.vue')
     },
    {
      path:"/login",
      name: 'login',
      component: LoginView
    }



  ]
})

export default router
