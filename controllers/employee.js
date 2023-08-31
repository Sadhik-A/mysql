const Employee = require('../models/employee.js');
const { validationResult } = require('express-validator');

// express validator for username and password
module.exports.login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return res.status(200).json('Validation successful');
};
// select all emoloyees from the database
module.exports.getemployees = async (req, res) => {
  try {
    const employees = await Employee.fetchAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching employees.' });
  }
}
// add a new employee to database
module.exports.addemployee = async (req, res) => {
  try {
    const { id, first_name, last_name, hourly_pay, hire_date } = req.body;
    const parsedHourlyPay = parseFloat(hourly_pay); 
    const parsedEmployeeID = parseInt(id); 
    const employee = await Employee.forge({
      id: parsedEmployeeID,
      first_name,
      last_name,
      hourly_pay: parsedHourlyPay,
      hire_date
    }).save();

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding employees.' });
  }
};

// delete an employee from database
module.exports.deleteemployee = async (req, res) => {
  const { id } = req.params;
  try{
   let user =  await Employee.where({  id }).destroy() 
    res.json("user deleted successfully");
  }
  catch(error){
    res.status(500).json({ error: 'An error occurred while deleting employee.' });
  }
};

// update an employee

module.exports.updateemployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.where({ id }).fetch();
    await employee.save(req.body, { patch: true });
    return res.status(200).json('Updated successfully');
  } catch (err) {
    return res.status(500).json(err);
  }
};

