// server.js
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let tasks = [];
let idCounter = 1;

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Create a new task
app.post('/tasks', (req, res) => {
  const task = { id: idCounter++, name: req.body.name };
  tasks.push(task);
  res.json(task);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.name = req.body.name;
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
