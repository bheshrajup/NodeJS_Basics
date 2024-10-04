// Import required modules
const http = require('http'); // For creating the server
const fs = require('fs'); // For file operations
const url = require('url'); // For URL parsing

const PORT = 3000; // Define the port number for the server

// Function to read data from the JSON file
function readData() {
    const data = fs.readFileSync('data.json', 'utf8'); // Read the file
    return JSON.parse(data); // Parse JSON and return it
}

// Function to write data to the JSON file
function writeData(data) {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); // Write JSON data to file
}

// Create an HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parse the request URL
    const method = req.method; // Get the request method

    // Initialize an empty array for storing names
    let names = []; 

    // Read existing data from the JSON file
    try {
        names = readData(); // Try to read the data
    } catch (error) {
        console.error('Error reading file:', error); // Log error if any
    }

    // Handle POST request to add a name
    if (method === 'POST' && parsedUrl.pathname === '/add-name') {
        console.log('POST request received for adding name'); // Debug log
        let body = '';

        // Collect data from the request body
        req.on('data', chunk => {
            body += chunk.toString(); // Append chunks to body
        });

        // When all data has been received
        req.on('end', () => {
            const { name } = JSON.parse(body); // Parse the name from body
            const newId = names.length > 0 ? names[names.length - 1].id + 1 : 1; // Create new ID
            names.push({ name: name, id: newId }); // Add name and ID to names array
            writeData(names); // Write updated names to file
            console.log(`Added: ${name} with ID: ${newId}`); // Log addition
            res.writeHead(201, { 'Content-Type': 'application/json' }); // Send response header
            res.end(JSON.stringify({ message: 'Name added', id: newId })); // Send response
        });
    } 
    // Handle GET request to retrieve all names
    else if (method === 'GET' && parsedUrl.pathname === '/names') {
        console.log('GET request received for all names'); // Debug log
        res.writeHead(200, { 'Content-Type': 'application/json' }); // Send response header
        res.end(JSON.stringify(names)); // Send all names as JSON
    } 
    // Handle GET request to retrieve a name by ID
    else if (method === 'GET' && parsedUrl.pathname.startsWith('/names/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[2]); // Get ID from URL
        console.log(`GET request received for ID: ${id}`); // Debug log
        const entry = names.find(item => item.id === id); // Find the entry by ID

        if (entry) {
            res.writeHead(200, { 'Content-Type': 'application/json' }); // Send response header
            res.end(JSON.stringify(entry)); // Send entry as JSON
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' }); // Not found header
            res.end(JSON.stringify({ message: 'Name not found' })); // Send not found message
        }
    } 
    // Handle PUT request to update a name by ID
    else if (method === 'PUT' && parsedUrl.pathname.startsWith('/names/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[2]); // Get ID from URL
        console.log(`PUT request received for ID: ${id}`); // Debug log
        let body = '';

        // Collect data from the request body
        req.on('data', chunk => {
            body += chunk.toString(); // Append chunks to body
        });

        // When all data has been received
        req.on('end', () => {
            const { name } = JSON.parse(body); // Parse the name from body
            const index = names.findIndex(item => item.id === id); // Find index by ID

            if (index !== -1) {
                names[index].name = name; // Update the name
                writeData(names); // Write updated names to file
                console.log(`Updated ID: ${id} with new name: ${name}`); // Log update
                res.writeHead(200, { 'Content-Type': 'application/json' }); // Send response header
                res.end(JSON.stringify({ message: 'Name updated', id })); // Send response
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' }); // Not found header
                res.end(JSON.stringify({ message: 'Name not found' })); // Send not found message
            }
        });
    } 
    // Handle DELETE request to remove a name by ID
    else if (method === 'DELETE' && parsedUrl.pathname.startsWith('/names/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[2]); // Get ID from URL
        console.log(`DELETE request received for ID: ${id}`); // Debug log
        const index = names.findIndex(item => item.id === id); // Find index by ID

        if (index !== -1) {
            names.splice(index, 1); // Remove entry from names
            writeData(names); // Write updated names to file
            console.log(`Deleted ID: ${id}`); // Log deletion
            res.writeHead(200, { 'Content-Type': 'application/json' }); // Send response header
            res.end(JSON.stringify({ message: 'Name deleted' })); // Send response
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' }); // Not found header
            res.end(JSON.stringify({ message: 'Name not found' })); // Send not found message
        }
    } else {
        console.log('Invalid API route'); // Debug log
        res.writeHead(404, { 'Content-Type': 'application/json' }); // Invalid route header
        res.end(JSON.stringify({ message: 'Invalid API route' })); // Send invalid route message
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log server start message
});
