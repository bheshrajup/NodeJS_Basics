// Import required modules
const http = require('http'); 
const fs = require('fs'); 
const url = require('url'); 
const PORT = 3000;

// Function to read data from the JSON file
function readData() {
    const data = fs.readFileSync('data.json', 'utf8'); // Read the file
    return JSON.parse(data); 
}

// Function to write data to the JSON file
function writeData(data) {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); // Write JSON data to file
}

// Create an HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); 
    const method = req.method; 

    // Initialize an empty array for storing names
    let names = []; 

    // Read existing data from the JSON file
    try {
        names = readData();
    } catch (error) {
        console.error('Error reading file:', error);
    }

    // POST request to add a name
    if (method === 'POST' && parsedUrl.pathname === '/add-name') {
        console.log('POST request received for adding name');
        let body = '';

        // Collect data 
        req.on('data', chunk => {
            body += chunk.toString(); 
        });

        // When all data has been received
        req.on('end', () => {
            const { name } = JSON.parse(body); 
            const newId = names.length > 0 ? names[names.length - 1].id + 1 : 1; // Create new ID
            names.push({ name: name, id: newId }); // Add name and ID to names array
            writeData(names); 
            console.log(`Added: ${name} with ID: ${newId}`); //Added Successfully
            res.writeHead(201, { 'Content-Type': 'application/json' }); 
            res.end(JSON.stringify({ message: 'Name added', id: newId })); 
        });
    } 
    // Handle GET request to retrieve all names
    else if (method === 'GET' && parsedUrl.pathname === '/names') {
        console.log('GET request received for all names'); 
        res.writeHead(200, { 'Content-Type': 'application/json' }); 
        res.end(JSON.stringify(names)); 1
    } 
    // Handle GET request to retrieve a name by ID
    else if (method === 'GET' && parsedUrl.pathname.startsWith('/names/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[2]); // Get ID from URL
        console.log(`GET request received for ID: ${id}`);
        const entry = names.find(item => item.id === id); 

        if (entry) {
            res.writeHead(200, { 'Content-Type': 'application/json' }); 
            res.end(JSON.stringify(entry)); 
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Name not found' })); //not found message
        }
    } 
    // Handle PUT request to update a name by ID
    else if (method === 'PUT' && parsedUrl.pathname.startsWith('/names/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[2]); // Get ID from URL
        console.log(`PUT request received for ID: ${id}`); 
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); 
        });

        // When all data has been received
        req.on('end', () => {
            const { name } = JSON.parse(body);
            const index = names.findIndex(item => item.id === id); // Find index by ID

            if (index !== -1) {
                names[index].name = name; // Update the name
                writeData(names); // Write updated names to file
                console.log(`Updated ID: ${id} with new name: ${name}`); 
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Name updated', id })); 
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' }); 
                res.end(JSON.stringify({ message: 'Name not found' })); 
            }
        });
    } 
    // Handle DELETE request to remove a name by ID
    else if (method === 'DELETE' && parsedUrl.pathname.startsWith('/names/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[2]); // Get ID from URL
        console.log(`DELETE request received for ID: ${id}`); 
        const index = names.findIndex(item => item.id === id);

        if (index !== -1) {
            names.splice(index, 1); 
            writeData(names);
            console.log(`Deleted ID: ${id}`);
            res.writeHead(200, { 'Content-Type': 'application/json' }); 
            res.end(JSON.stringify({ message: 'Name deleted' })); 
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' }); 
            res.end(JSON.stringify({ message: 'Name not found' })); 
        }
    } else {
        console.log('Invalid API route'); 
        res.writeHead(404, { 'Content-Type': 'application/json' }); 
        res.end(JSON.stringify({ message: 'Invalid API route' })); 
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); //Start server
});
