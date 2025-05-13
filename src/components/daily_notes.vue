<template>
    <div>
        <h1>Daily Notes</h1>
        <div>
            <textarea v-model="note" placeholder="Write your note here"></textarea>
            <button @click="addNote">Add Note</button>
        </div>
        <div>
            <ul v-for="note in notes" :key="note">
                <li>{{ note }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import dailyNotes from '../assets/daily-notes.json';
const notes = ref([]);
const note = ref('');
let previousHour = 23;
function updateNotes() {
    console.log(dailyNotes);
    dailyNotes.notes.push({
        time: new Date().getHours(),
        title: 'Note ' + (dailyNotes.notes.length + 1),
        content: note.value
    });
    getNotes();
}

function writeNotes() {
    
    const todayNotes = {
        date: currentDate,
        notes: [...dailyNotes.notes]
    };

    try {

        const response = fetch('./assets/daily-notes.json');
        const existingData = response.json();

        if (!existingData.history) {
            existingData.history = [];
        }

        existingData.history.push(todayNotes);

        fetch('./assets/daily-notes.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(existingData),
        });

        dailyNotes.notes = [];
        getNotes();
    } catch (error) {
        console.error('Error saving notes:', error);
    }
}
function getNotes() {
    notes.value = dailyNotes.notes.map(note => note.content);
}
function addNote() {
    updateNotes();
    note.value = '';
}
// Function to check if it's midnight
function checkMidnight() {
    const now = new Date();
    if (now.getHours() <= previousHour) {
        writeNotes();
    }
    previousHour = now.getHours();
}
onMounted(() => {
    getNotes();
    setInterval(checkMidnight, 7200000);
});
</script>

<style scoped>
</style>