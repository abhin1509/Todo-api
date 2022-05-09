const mongoose = require('mongoose');

// DB schema
const todoSchema = new mongoose.Schema({
   name: String,
   description: String
});

const Todo = new mongoose.model("Todo", todoSchema);

module.exports = Todo;