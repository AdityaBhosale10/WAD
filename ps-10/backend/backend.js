const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// In-memory local storage
let todos = [];

// Unique ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

// POST - Create new Todo
app.post("/todo", async function(req, res) {
    const bodyPayload = req.body;
    if (!bodyPayload.title || !bodyPayload.description) {
        res.status(411).json({
            msg: "You have sent todos in wrong format"
        });
    } else {
        const newTodo = {
            id: generateId(),
            title: bodyPayload.title,
            description: bodyPayload.description,
            completed: false
        };
        todos.push(newTodo);
        res.json({
            msg: "Todo created"
        });
    }
});

// GET - Fetch all Todos
app.get("/todos", async function(req, res) {
    res.json({ todos });
});

// PUT - Update Todo (title, description, completed)
app.put("/todo", async function(req, res) {
    const updateBody = req.body;
    if (!updateBody.id) {
        res.status(411).json({
            msg: "You have sent id in wrong format"
        });
    } else {
        const todo = todos.find(todo => todo.id === updateBody.id);
        if (todo) {
            if (updateBody.completed !== undefined) {
                todo.completed = updateBody.completed;
            }
            if (updateBody.title) {
                todo.title = updateBody.title;
            }
            if (updateBody.description) {
                todo.description = updateBody.description;
            }
            res.json({
                msg: "Todo updated"
            });
        } else {
            res.status(404).json({
                msg: "Todo not found"
            });
        }
    }
});

app.listen(3080, function() {
    console.log("Server is running on port 3080");
});
