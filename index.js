 import  express   from "express";
 import  mysql from "mysql";
 import  { body, validationResult } from 'express-validator';
 const app = express();
 const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "password",
   database: "mydb"
 })

 app.use(express.json());


 // user validation using express validator

 app.post('/login',body('email').isEmail(),
 body('password').isLength({min:5}).withMessage('password must be at least 5 characters long'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return res.status(200).json("validation suscessfull");
  })

// get details  from database 

app.get("/employee", (req, res) => {
    const q="select * from employee";
    db.query(q, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(data);
    })
})

// add new employee

app.post("/employee", (req, res) => {
    const q="insert into employee (`employee_ID`, `first_name`, `last_name`, `hourly_pay`)values (?)";
    const values=[req.body.employee_ID, req.body.first_name, req.body.last_name, req.body.hourly_pay];
    db.query(q,[values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json("employee added");
    })
})

// delete an employee

app.delete('/employee/:id', (req, res) => {
 const id=req.params.id;
 console.log(id)
 const q="delete from employee where employee_ID = ?";
 db.query(q,[id], (err, data) => {
   if (err) {
     return res.status(500).json(err);
   }
   return res.status(200).json("employee deleted");
 })
})

//update an employee (ONLY FIRST NAME)

app.put('/employee/:id', (req, res) => {
 const id=req.params.id;
 console.log(id)
 const q="update employee set first_name = ? where employee_ID = ?";
 db.query(q,[req.body.first_name, id], (err, data) => {
   if (err) {
     return res.status(500).json(err);
   }
   return res.status(200).json("employee updated");
 })
})

 app.listen(3000 , () => {
   console.log("Listening on port 3000");
 });