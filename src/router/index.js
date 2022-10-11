import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PhotoView from '../views/PhotoView.vue'
import NewsView from '../views/NewsView/NewsView.vue'
import MusicView from '../views/MusicView/MusicView.vue'
import LoginView from '../views/UserView/LoginView.vue'
import RegisterView from '../views/UserView/RegisterView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/photo',
    name: 'photo',
    component: PhotoView
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView,
  },
  {
    path: '/music',
    name: 'music',
    component: MusicView,
  },
  {
    path:'/login',
    name:'login',
    component:LoginView
  },
  {
    path:'/register',
    name:'register',
    component:RegisterView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
