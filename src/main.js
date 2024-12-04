

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import melonCount from './components/melon-count.vue'
import updateDates from './components/update_dates.vue'
import postIt from './components/post-it.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/countdown',
      component: melonCount
    },
    {
      path: '/update_dates',
      component: updateDates
    }
  ]
})

createApp(App).use(router).mount('#app')
