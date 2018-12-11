// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import firebase from 'firebase'

Vue.use(Vuetify, {
  theme: {
    primary: '#00796b',
    secondary: '#4db6ac'
  }
})

Vue.config.productionTip = false

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyC7fKmuDPjZS0FQpZTV7Oi_8ox3WL09hMU',
  authDomain: 'olustorage-124fd.firebaseapp.com',
  databaseURL: 'https://olustorage-124fd.firebaseio.com',
  projectId: 'olustorage-124fd',
  storageBucket: 'olustorage-124fd.appspot.com',
  messagingSenderId: '59986250293'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
      created () {
        if (firebaseUser) {
          store.dispatch('autoSignIn', firebaseUser)
        }
      }
    })
    unsubscribe()
  })
