
 require('dotenv').config(); 
const express = require('express');
 const employeeroutes = require('./routes/employee.js');
 const userroutes=require('./routes/user.js')
 const app = express();
 app.use(express.json());
 app.use(userroutes);
 app.use(employeeroutes);
 app.listen(3000 , () => {
   console.log("Listening on port 3000");
 });