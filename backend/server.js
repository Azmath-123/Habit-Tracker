const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/habit_tracker')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);

// app.post('/api/auth/register', async (req, res) => {
//     try {
//         console.log('Register request received:', req.body);
//         // For testing, just send back the received data
//         res.json({ 
//             message: 'Registration successful', 
//             user: req.body 
//         });
//     } catch (error) {
//         console.error('Register error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });
// Habit Schema
const habitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    frequency: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Habit = mongoose.model('Habit', habitSchema);

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// GET habits
app.get('/api/habits', async (req, res) => {
    try {
        const habits = await Habit.find().sort({ createdAt: -1 });
        console.log('Fetched habits:', habits);
        res.json(habits);
    } catch (error) {
        console.error('Error fetching habits:', error);
        res.status(500).json({ error: error.message });
    }
});

// POST new habit
app.post('/api/habits', async (req, res) => {
    try {
        console.log('Received POST request with data:', req.body);
        
        const { name, frequency, description } = req.body;
        if (!name || !frequency || !description) {
            return res.status(400).json({ 
                error: 'Missing required fields' 
            });
        }

        const habit = new Habit({
            name,
            frequency,
            description
        });

        const savedHabit = await habit.save();
        console.log('Saved habit:', savedHabit);
        
        res.status(201).json(savedHabit);
    } catch (error) {
        console.error('Error saving habit:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
