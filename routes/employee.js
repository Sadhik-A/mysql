const express = require('express');
const { body } = require('express-validator');
const employeecontrol = require('../controllers/employee.js');

const router = express.Router();

router.get('/employee', employeecontrol.getemployees);
router.post('/employee',  employeecontrol.addemployee);
router.post('/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  employeecontrol.login
);
router.delete('/employee/:id', employeecontrol.deleteemployee);
router.put('/employee/:id', employeecontrol.updateemployee);
module.exports = router;
