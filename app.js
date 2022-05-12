const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo');
const app = express();
require('dotenv/config');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


mongoose.connect(process.env.DB_CONNECTION, ({useNewUrlParser:true, useUnifiedTopology: true})).then( ()=>{
   console.log('Connected to db...');
   app.listen(3000);
}).catch((err) => console.log(err));


// To create
app.post('/api/v1/list/new', async (req, res) => {
   try {
      /*if(!req.body.hasOwnProperty('description')) { // validation check
         return res.status(404).json({
            success: false,
            message: "Enter correct field name",
            items: []
         });
      }*/
      const todo = await Todo.create(req.body);
      res.status(201).json({
         success: true,
         message: "item created successfully",
         items: todo
      });   
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "ERROR",
         items: []
      });
   }
});


// To read
app.get('/api/v1/list', async (req, res) => {
   try {
      const todo = await Todo.find().select('-__v');
      res.status(200).json({
         success: true,
         message: "Successfully fetched all the items",
         items: todo
      });   
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "ERROR",
         items: []
      });
   }
});

//* To update
app.put('/api/v1/list/:id', async (req, res) => {
   try {
      const id = req.params.id;
      let todo = await Todo.findById(id);
   
      if(!todo) {
         return res.status(404).json({
            success: false,
            message: "Todo not found",
            items: []
         });
      }
   
      todo = await Todo.findByIdAndUpdate(id, req.body, {
         new: true,
         useFindAndModify: false,
         runValidators: true
      });
   
      res.status(202).json({
         success: true,
         message: "updated successfully",
         items: todo
      });   
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "ERROR",
         items: []
      });
   }
});


//*    To delete
app.delete('/api/v1/list/:id', async (req, res) => {
   
   try {
      const id = req.params.id;
      const todo = await Todo.findById(id);
      if(!todo) {
         return res.status(404).json({
            success: false,
            message: "todo not found",
            items: []
         })
      }

      await todo.remove();

      res.status(202).json({
         success: true,
         message: "todo is deleted successfully",
         items: todo
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "ERROR",
         items: []
      });
   }
});