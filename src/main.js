import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyAV-yqj14n14QD25BWgEYItvUw21g63Thw",
    authDomain: "ezbidfta867.firebaseapp.com",
    databaseURL: "https://ezbidfta867.firebaseio.com",
    projectId: "ezbidfta867",
    storageBucket: "ezbidfta867.appspot.com",
    messagingSenderId: "1044616180978"
})

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
