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
import { useFetch } from 'vue-app';

const start_date = ref('');
const end_date = ref('');

const updateInfo = async () => {
  const data = {
    start_date: start_date.value,
    end_date: end_date.value,
  };

  try {
    const response = await useFetch('/api/update-melon-info', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update melon info');
    }

    alert('Melon info updated successfully!');
  } catch (error) {
    console.error(error);
    alert('Failed to update melon info');
  }
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
