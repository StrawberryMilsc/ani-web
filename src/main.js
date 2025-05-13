import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import melonCount from './components/melon-count.vue'
import updateDates from './components/update_dates.vue'
import dailyNotes from './components/daily_notes.vue'
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
      path: '/dailyNotes',
      component: dailyNotes
    }
  ]
})

createApp(App).use(router).mount('#app')
