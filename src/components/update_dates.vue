<template>
  <div class="update-form">
    <h1>Update Melon C Info</h1>
    <form @submit.prevent="updateInfo">
      <div class="form-group">
        <label for="start_date">Start Date:</label>
        <input type="date" id="start_date" v-model="start_date" required>
      </div>
      <div class="form-group">
        <label for="end_date">End Date:</label>
        <input type="date" id="end_date" v-model="end_date" required>
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const start_date = ref('');
const end_date = ref('');

const updateInfo = () => {
  const data = {
    start_date: start_date.value,
    end_date: end_date.value,
  };
  fetch('./assets/melon-c-info.json')
    .then(response => response.json())
    .then(json => {
      json.start_date = start_date.value;
      json.end_date = end_date.value;
      return json;
    })
    .then(json => {
      fetch('./assets/melon-c-info.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });
    });

 
};
</script>

<style scoped>
.update-form {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
}

input[type="date"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
