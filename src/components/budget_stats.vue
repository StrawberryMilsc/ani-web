<template>
    <div>
        <h1>Budget Stats</h1>
        <div id="visualization">

        </div>
        <div id="input-container">
            <input type="text" v-model="expense" placeholder="expense">
            <input type="number" v-model="amount" placeholder="amount">
            <button @click="addBudget">Add Budget</button>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';

const expense = ref('');
const amount = ref(0);

const addBudget = () => {
    console.log(expense.value, amount.value);
}

</script>

<style scoped>

</style>
