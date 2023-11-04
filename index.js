require('dotenv').config();
const express = require("express");
require('./db/conn');
const app = express();

app.use(express.json());

const userData=require("./router/UserData");
app.use('/api',userData);


const PORT = process.env.PORT || 3500;

// app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Allow requests from 'http://localhost:3000'
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next()
// })




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});