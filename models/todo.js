const mongoose = require('mongoose');

// DB schema
const todoSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   description: String
}, {
   timestamps: true
});


const Todo = new mongoose.model("Todo", todoSchema);

module.exports = Todo;