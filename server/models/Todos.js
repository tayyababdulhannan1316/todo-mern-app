const mongoose = require('mongoose');
// Define the Todo schema
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true  // Title is required  
    },
    location: {
        type: String,
        required: true  // Location is required
    },
    description: {
        type: String, 
        required: true  // Description is required
    },
  });

// Create the Todo model
const TodoModel = mongoose.model('Todos', todoSchema);
module.exports = TodoModel;  // Export the model for use in other files