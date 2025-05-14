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

// Function to get current date in YYYY-MM-DD format
function getCurrentDate() {
    const date = new Date();
    return date.toISOString().split('T')[0];
}

async function loadCurrentNotes() {
    try {
        const response = await fetch('./assets/daily-notes.json');
        const data = await response.json();
        
        // If there are no notes for today, initialize an empty array
        if (!data.notes) {
            data.notes = [];
        }
        
        // Update the local notes array
        notes.value = data.notes.map(note => note.content);
        
        // Update the dailyNotes object
        dailyNotes.notes = data.notes;
    } catch (error) {
        console.error('Error loading notes:', error);
    }
}

function updateNotes() {
    const newNote = {
        time: new Date().getHours(),
        title: 'Note ' + (dailyNotes.notes.length + 1),
        content: note.value
    };
    
    dailyNotes.notes.push(newNote);
    notes.value = dailyNotes.notes.map(note => note.content);
}

async function writeNotes() {
    const currentDate = getCurrentDate();
    
    const todayNotes = {
        date: currentDate,
        notes: [...dailyNotes.notes]
    };

    try {
        const response = await fetch('./assets/daily-notes.json');
        const existingData = await response.json();

        if (!existingData.history) {
            existingData.history = [];
        }

        existingData.history.push(todayNotes);
        existingData.notes = []; // Reset current notes

        await fetch('./assets/daily-notes.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(existingData),
        });

        // Update local state
        dailyNotes.notes = [];
        notes.value = [];
    } catch (error) {
        console.error('Error saving notes:', error);
    }
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

onMounted(async () => {
    await loadCurrentNotes();
    setInterval(checkMidnight, 7200000);
});
</script>

<style scoped>
</style>