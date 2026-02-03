const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
// Use local DB if MONGO_URI is not provided
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Models
const Project = require('./models/Project');
const projectRoutes = require('./routes/projectRoutes');

// Routes
app.use('/api/projects', projectRoutes);

// Seed Data
const seedProjects = async () => {
    try {
        const count = await Project.countDocuments();
        if (count === 0) {
            const projects = [
                {
                    title: 'Comprehensive ERP Solution: HR, Inventory, & Sales Management',
                    description: 'A full-featured ERP system designed to streamline HR, inventory, and sales processes.',
                    link: 'https://nextstac-erp-9ck1.vercel.app',
                    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
                }
            ];
            await Project.insertMany(projects);
            console.log('Seed data inserted');
        }
    } catch (error) {
        console.error("Seeding error:", error);
    }
};
// Run seed on connect
mongoose.connection.once('open', seedProjects);

app.post('/api/contact', (req, res) => {
    // Placeholder for contact form logic
    console.log('Contact form submission:', req.body);
    res.json({ message: 'Message received!' });
});


app.post('/api/contact', (req, res) => {
    // Placeholder for contact form logic (e.g., email service)
    console.log('Contact form submission:', req.body);
    res.json({ message: 'Message received!' });
});

// Export for Vercel
module.exports = app;

// Only listen if not in production (Vercel handles this) or if running locally
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
