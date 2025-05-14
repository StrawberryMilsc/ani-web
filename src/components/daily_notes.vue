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
import { ref, onMounted } from 'vue';

const notes = ref([]);
const note = ref('');
let previousHour = 23;

// Load current notes from the server
async function loadCurrentNotes() {
    try {
        const response = await fetch('/api/notes');
        const data = await response.json();
        notes.value = data.notes.map(note => note.content);
    } catch (error) {
        console.error('Error loading notes:', error);
    }
}

// Add a new note
async function addNote() {
    if (!note.value.trim()) return;

    try {
        const response = await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: note.value }),
        });

        if (response.ok) {
            await loadCurrentNotes(); // Reload notes after adding
            note.value = ''; // Clear the input
        }
    } catch (error) {
        console.error('Error adding note:', error);
    }
}

// Save notes at midnight
async function saveDailyNotes() {
    try {
        const response = await fetch('/api/save-daily-notes', {
            method: 'POST',
        });

        if (response.ok) {
            await loadCurrentNotes(); // Reload notes after saving
        }
    } catch (error) {
        console.error('Error saving daily notes:', error);
    }
}

// Check if it's midnight
function checkMidnight() {
    const now = new Date();
    if (now.getHours() <= previousHour) {
        saveDailyNotes();
    }
    previousHour = now.getHours();
}

onMounted(async () => {
    await loadCurrentNotes();
    // Check every 2 hours for midnight
    setInterval(checkMidnight, 7200000);
});
</script>

<style scoped>
</style>