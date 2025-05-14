const express = require('express');
const fs = require('fs').promises;
const path = require('path');
//const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(express.static('dist')); // Serve the Vue.js built files

// Path to the notes JSON file
const NOTES_FILE = path.join(__dirname, 'data', 'daily-notes.json');

// Ensure the data directory exists
async function ensureDataDirectory() {
    const dataDir = path.join(__dirname, 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir);
    }
}

// Initialize notes file if it doesn't exist
async function initializeNotesFile() {
    try {
        await fs.access(NOTES_FILE);
    } catch {
        const initialData = {
            notes: [],
            history: []
        };
        await fs.writeFile(NOTES_FILE, JSON.stringify(initialData, null, 2));
    }
}

// Get current notes
app.get('/api/notes', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(NOTES_FILE, 'utf8'));
        res.json(data);
    } catch (error) {
        console.error('Error reading notes:', error);
        res.status(500).json({ error: 'Failed to read notes' });
    }
});

// Add a new note
app.post('/api/notes', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(NOTES_FILE, 'utf8'));
        const newNote = {
            time: new Date().getHours(),
            title: 'Note ' + (data.notes.length + 1),
            content: req.body.content
        };
        data.notes.push(newNote);
        await fs.writeFile(NOTES_FILE, JSON.stringify(data, null, 2));
        res.json(newNote);
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ error: 'Failed to add note' });
    }
});

// Save notes at midnight
app.post('/api/save-daily-notes', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(NOTES_FILE, 'utf8'));
        const currentDate = new Date().toISOString().split('T')[0];
        
        // Add current notes to history
        if (data.notes.length > 0) {
            data.history.push({
                date: currentDate,
                notes: [...data.notes]
            });
        }
        
        // Reset current notes
        data.notes = [];
        
        await fs.writeFile(NOTES_FILE, JSON.stringify(data, null, 2));
        res.json({ message: 'Notes saved successfully' });
    } catch (error) {
        console.error('Error saving daily notes:', error);
        res.status(500).json({ error: 'Failed to save daily notes' });
    }
});

// Serve the Vue app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Initialize server
async function startServer() {
    await ensureDataDirectory();
    await initializeNotesFile();
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();

