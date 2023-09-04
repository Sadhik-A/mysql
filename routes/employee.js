const express = require('express');

const employeecontrol = require('../controllers/employee.js');
const router = express.Router();
const middleware = require('../utils/authmiddleware.js');
router.get('/employee', employeecontrol.getemployees);
router.post('/employee', middleware.verification, employeecontrol.addemployee);
router.delete('/employee/:id', middleware.verification ,employeecontrol.deleteemployee);
router.put('/employee/:id', middleware.verification ,employeecontrol.updateemployee);
module.exports = router;
