import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: "Index",
        component: () => import('../views/Home/Index.vue'),
        children: [
          {
            path: '/rotation',
            name: "Rotation",
            component: () => import('../views/Home/Index/Rotation.vue'),
            meta: {
              keepAlive: true
            },
          },
          {
            path: '/type/:type',
            name: 'Type',
            component: () => import('../views/Home/Index/Type.vue'),
            meta: {
              keepAlive: true
            },
          }
        ],
        redirect: '/rotation'
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Home/Login.vue')
      },
      {
        path: '/register',
        name: "Register",
        component: () => import('../views/Home/Register.vue')
      },
      {
        path: '/productdetails',
        name: 'ProductDetails',
        component: () => import('../views/Home/ProductDetails.vue')
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Home/Search.vue')
      },
      {
        path: '/shoppingcart',
        name: 'ShoppingCart',
        component: () => import('../views/Home/ShoppingCart.vue')
      },
      
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
