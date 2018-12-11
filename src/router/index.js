import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

// lazy load routes
const routerOptions = [
  { path: '/', component: 'PageLanding' },
  { path: '/signin', component: 'PageSignin' },
  { path: '/signup', component: 'PageSignup' },
  { path: '/home', component: 'PageHome', meta: { requiresAuth: true } },
  { path: '*', component: 'PageNotFound' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/pages/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/signin')
  } else {
    next()
  }
})

export default router
