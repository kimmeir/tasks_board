import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/sa-dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/sa-dashboard')
  },
  {
    path: '/create',
    name: 'Create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/sa-create-task')
  },
  {
    path: '/task/:id',
    name:'Task',
    component: ()=> import('@/views/sa-task')
  },
  {
    path: '/users',
    name: 'Users',
    component:()=> import('@/views/sa-users')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
