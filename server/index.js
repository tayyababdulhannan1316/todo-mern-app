require("dotenv").config();
const express = require ("express");
const app = express()
const cors = require("cors");
const mongoose = require("mongoose");

// Connect to MongoDB
let dbURI = process.env.DB_URL || "mongodb://localhost:27017/todo";  // Use the DB_URL from .env or fallback to local 
console.log('dbURI', dbURI)
// MongoDB
if (dbURI.startsWith('"') && dbURI.endsWith('"')) {
    dbURI = dbURI.slice(1, -1);  // Remove quotes if they exist
}
mongoose.connect(dbURI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
const TodoModel = require("./models/Todos");  // Import the Todo model

app.use(cors());
 app.use(express.json());  // Middleware to parse JSON bodies


app.post("/createTodo", async(req, res) => {
    const todo = req.body;
   /* console.log('todo', todo)
    console.log(" Post Request received from client with Body:", req.body);*/
    const newTodo = new TodoModel(todo);
    try {
        await newTodo.save();  // Save the new todo to the database
        res.json(todo);  // Send the created todo back in the response
    } catch (error) {
        console.error("Error saving todo:", error);
        res.status(500).json({ error: "Failed to create todo" });  // Send an error response
    }

    /* res.send("POST request received");*/
});

app.get("/readTodos", async (req, res) => {
try {
        const todos = await TodoModel.find();
        
        res.send(todos);  // Send the list of todos back in the response
        
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Failed to fetch todos" });  // Send an error response
    } 
    /* res.send("GET request received");*/ 
});      

app.post("/updateTodo", async (req, res) => {
try {
        const todo = req.body;
    await TodoModel.findByIdAndUpdate(todo._id,{title: "final title"})    
    
        
        res.send("todo updated successfully");  // Send the list of todos back in the response
        
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Failed to fetch todos" });  // Send an error response
    } 
    /* res.send("GET request received");*/ 
}); 

app.post("/deleteTodo", async (req, res) => {
try {
        const todo = req.body;
    await TodoModel.findByIdAndDelete(todo._id);  // Delete the todo by its ID    

        
        res.send("todo deleted successfully");  // Send the list of todos back in the response
        
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Failed to delete todo" });  // Send an error response
    } 
    
}); 


const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`Server is running perfectly on ports ${PORT}`);

})