<template>
  <div class="countdown-container">
    <h1>Its will be...</h1>
    <div class="countdown">
      <div class="time-block">
        <span class="number">{{ days }}</span>
        <span class="label">Days</span>
      </div>
      <div class="time-block">
        <span class="number">{{ hours }}</span>
        <span class="label">Hours</span>
      </div>
      <div class="time-block">
        <span class="number">{{ minutes }}</span>
        <span class="label">Minutes</span>
      </div>
      <div class="time-block">
        <span class="number">{{ seconds }}</span>
        <span class="label">Seconds</span>
      </div>
    </div>
    <h1>Until I see her again</h1>
  </div>

  <div class="countdown-container">
    <h1>But its already been...</h1>
    <div class="countdown">
      <div class="time-block">
        <span class="number">{{ sofarDays }}</span>
        <span class="label">Days</span>
      </div>
      <div class="time-block">
        <span class="number">{{ sofarHours }}</span>
        <span class="label">Hours</span>
      </div>
      <div class="time-block">
        <span class="number">{{ sofarMinutes }}</span>
        <span class="label">Minutes</span>
      </div>
      <div class="time-block">
        <span class="number">{{ sofarSeconds }}</span>
        <span class="label">Seconds</span>
      </div>
      
    </div>
    <h1>Since I saw her last</h1>
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import melonInfo from '../assets/melon-c-info.json';

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const startDate = new Date(melonInfo.start_date);
const endDate = new Date(melonInfo.end_date);
let timer;
const sofarDays = ref(0);
const sofarHours = ref(0);
const sofarMinutes = ref(0);
const sofarSeconds = ref(0);    

function updateSoFar() {
  const now = new Date();
  const difference = now - startDate;
  sofarDays.value = Math.floor(difference / (1000 * 60 * 60 * 24));
  sofarHours.value = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  sofarMinutes.value = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  sofarSeconds.value = Math.floor((difference % (1000 * 60)) / 1000);
}
function updateCountdown() {
  const now = new Date();
  const difference = endDate - now;


  if (difference > 0) {
    days.value = Math.floor(difference / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes.value = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((difference % (1000 * 60)) / 1000);
  }
}
function updateAll() {
  updateCountdown();
  updateSoFar();
}

onMounted(() => {
  updateAll();
  timer = setInterval(updateAll, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.countdown-container {
  text-align: center;
  padding: 2rem;
}

.countdown {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 100px;
  min-width: 80px;
}

.number {
  font-size: 4rem;
  font-weight: bold;
  background: #f0f0f0;
  padding: 1rem 2rem;
  border-radius: 10px;
  min-width: 100px;
  display: inline-block;
}

.label {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  color: #666;
  text-transform: uppercase;
}

@media (max-width: 600px) {
  .number {
    font-size: 3rem;
  }

  .label {
    font-size: 1rem;
  }

  .countdown {
    flex-direction: column;
  }

  .time-block {
    margin-bottom: 1rem;
  }
}
</style>
