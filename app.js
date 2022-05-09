const express = require('express');
const mongoose = require('mongoose');
const app = express();


const dbURI = 'mongodb+srv://abhinav-ninja:test1234@cluster0.rl7gm.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.connect(dbURI, ({useNewUrlParser:true, useUnifiedTopology: true})).then( ()=>{
   console.log('Connected to db...');
   app.listen(3000);
}).catch((err) => console.log(err));