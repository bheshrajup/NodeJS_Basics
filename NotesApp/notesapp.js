const http = require('http');
const url = require('url');
const fs = require('fs');

// To store notes in memory
let notes = [];

// Create the server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Serve CSS file
    if (req.method === 'GET' && parsedUrl.pathname === '/style.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(fs.readFileSync('./public/style.css'));
        return;
    }

    // Serve HTML page on GET /
    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Notes App</title>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <div class="container">
                    <h1>Notes</h1>
                    <form action="/add" method="POST">
                        <textarea name="note" placeholder="Enter your note here" required></textarea><br>
                        <button type="submit">Add Note</button>
                    </form>
                    <h2>Your Notes:</h2>
                    <ul>
                        ${notes.map((note, index) => `
                            <li>
                                ${note} 
                                <form action="/delete/${index}" method="POST" style="display:inline;">
                                    <button type="submit">Delete</button>
                                </form>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </body>
            </html>
        `);        
    } 
    // Handle POST /add to add a new note
    else if (req.method === 'POST' && parsedUrl.pathname === '/add') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newNote = body.split('=')[1]; // Get the note from the request body
            const decodedNote = decodeURIComponent(newNote.replace(/\+/g, ' ')); // Replace '+' with a space
            notes.push(decodedNote); // Add the note to the notes array
            res.writeHead(302, { Location: '/' }); // Redirect back to the home page
            res.end();
        });
    } 
    // Handle POST /delete/:id to delete a note by ID
    else if (req.method === 'POST' && parsedUrl.pathname.startsWith('/delete/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[2]); // Get the note index from the URL
        if (id >= 0 && id < notes.length) {
            notes.splice(id, 1); // Remove the note from the array
        }
        res.writeHead(302, { Location: '/' }); // Redirect back to the home page
        res.end();
    } else {
        res.writeHead(404);
        res.end('404 Not Found');
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
