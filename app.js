const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dbURI = 'mongodb+srv://abhinav-ninja:test1234@cluster0.rl7gm.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.connect(dbURI, ({useNewUrlParser:true, useUnifiedTopology: true})).then( ()=>{
   console.log('Connected to db...');
   app.listen(3000);
}).catch((err) => console.log(err));


// To create
app.post('/api/v1/list/new', async (req, res) => {
   try {
      const todo = await Todo.create(req.body);
      res.status(201).json({
         success: true,
         todo
      });   
   } catch (error) {
      res.status(400).json({
         success: true,
         message: "ERROR"
      });
   }
});

// To read
app.get('/api/v1/list', async (req, res) => {
   try {
      const todo = await Todo.find();
      res.status(200).json({
         success: true,
         todo
      });   
   } catch (error) {
      res.status(400).json({
         success: true,
         message: "ERROR"
      });
   }
});