const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the public directory

// File path for data
const dataFilePath = path.join(__dirname, 'data.json');

// Initialize ID counter
let idCounter = 1;

// Load data from data.json
const loadData = () => {
    try {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data file:', error);
        return [];
    }
};

// Save data to data.json
const saveData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Create a new item
app.post('/create', (req, res) => {
    const data = loadData();
    const newItem = {
        id: idCounter++, // Use the current counter and then increment it
        name: req.body.name,
        price: req.body.price,
    };
    data.push(newItem);
    saveData(data);
    res.status(201).json(newItem);
});

// Get all items
app.get('/items', (req, res) => {
    const data = loadData();
    res.json(data);
});

// Get a single item by ID for editing
app.get('/item/:id', (req, res) => {
    const data = loadData();
    const item = data.find(item => item.id == req.params.id);
    res.json(item);
});

// Update an item
app.post('/update', (req, res) => {
    const data = loadData();
    const { id, name, price } = req.body;
    const index = data.findIndex(item => item.id == id);
    if (index > -1) {
        data[index] = { id: Number(id), name, price };
        saveData(data);
        res.json(data[index]);
    } else {
        res.status(404).send('Item not found');
    }
});

// Delete an item
app.post('/delete', (req, res) => {
    const data = loadData();
    const { id } = req.body;
    const newData = data.filter(item => item.id != id);
    saveData(newData);
    res.sendStatus(204); // No content
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
