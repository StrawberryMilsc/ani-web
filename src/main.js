

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import melonCount from './components/melon-count.vue'
import updateDates from './components/update_dates.vue'
import budget from './components/budget.vue'
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
    },
    {
      path: '/budget',
      component: budget
    }
  ]
})

createApp(App).use(router).mount('#app')
