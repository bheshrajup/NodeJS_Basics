const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const tasksFilePath = path.join(__dirname, 'public', 'task.json');

// Function to read tasks from the JSON file
function readTasks() {
    try {
        const data = fs.readFileSync(tasksFilePath);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Function to save tasks to the JSON file
function saveTasks(tasks) {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// Create HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Serve the index.html file
    if (parsedUrl.pathname === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } 
    // Serve the list.html file
    else if (parsedUrl.pathname === '/list.html') {
        fs.readFile(path.join(__dirname, 'public', 'list.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading list.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } 
    // Serve the CSS file
    else if (parsedUrl.pathname === '/css/style.css') {
        fs.readFile(path.join(__dirname, 'public', 'css', 'style.css'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading styles.css');
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } 
    // Handle fetching tasks
    else if (parsedUrl.pathname === '/tasks') {
        const tasks = readTasks();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
    } 
    // Handle adding a task
    else if (parsedUrl.pathname === '/add-task' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newTask = JSON.parse(body);
            const tasks = readTasks();
            const taskId = Date.now().toString();
            tasks.push({ id: taskId, task: newTask.task, dueDate: newTask.dueDate });
            saveTasks(tasks);
            res.writeHead(200);
            res.end();
        });
    } 
    // Handle editing a task
    else if (parsedUrl.pathname.startsWith('/edit-task/') && req.method === 'PUT') {
        const id = parsedUrl.pathname.split('/')[2];
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedTask = JSON.parse(body);
            const tasks = readTasks();
            const taskIndex = tasks.findIndex(task => task.id === id);
            if (taskIndex !== -1) {
                tasks[taskIndex].task = updatedTask.task;
                tasks[taskIndex].dueDate = updatedTask.dueDate;
                saveTasks(tasks);
            }
            res.writeHead(200);
            res.end();
        });
    } 
    // Handle deleting a task
    else if (parsedUrl.pathname.startsWith('/delete-task/') && req.method === 'DELETE') {
        const id = parsedUrl.pathname.split('/')[2];
        const tasks = readTasks();
        const updatedTasks = tasks.filter(task => task.id !== id);
        saveTasks(updatedTasks);
        res.writeHead(200);
        res.end();
    } 
    // Handle 404
    else {
        res.writeHead(404);
        res.end('404 Not Found');
    }
});

// Start server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
