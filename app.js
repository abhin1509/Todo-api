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

// To send response
sendResponse = (res, statusCode, bool, msg, todo) => {
   return res.status(statusCode).json({
      success: bool,
      message: msg,
      items: todo
   });
}

// Create endpoint
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
      return sendResponse(res, 201, true, 'item created successfully', todo);

   } catch (error) {
      sendResponse(res, 500, false, 'ERROR', []);
   }
});

// To read
app.get('/api/v1/list', async (req, res) => {
   try {
      const todo = await Todo.find().select('-__v');
      return sendResponse(res, 200, true, 'Successfully fetched all the items', todo);

   } catch (error) {
      sendResponse(res, 500, false, 'ERROR', []);
   }
});

//* To update
app.put('/api/v1/list/:id', async (req, res) => {
   try {
      const id = req.params.id;
      let todo = await Todo.findById(id);
   
      if(!todo) {
         return sendResponse(res, 404, false, 'Todo not found', []);
      }
   
      todo = await Todo.findByIdAndUpdate(id, req.body, {
         new: true,
         useFindAndModify: false,
         runValidators: true
      });
      return sendResponse(res, 202, true, 'updated successfully', todo);

   } catch (error) {
      sendResponse(res, 500, false, 'ERROR', []);
   }
});


//*    To delete
app.delete('/api/v1/list/:id', async (req, res) => {
   
   try {
      const id = req.params.id;
      const todo = await Todo.findById(id);
      if(!todo) {
         return sendResponse(res, 404, false, 'Todo not found', []);
      }

      await todo.remove();
      return sendResponse(res, 202, true, 'todo is deleted successfully', todo);

   } catch (error) {
      sendResponse(res, 500, false, 'ERROR', []);
   }
});