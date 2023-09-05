const Employee = require('../models/employee.js');

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
    const employee = await new Employee().save({
      id: parsedEmployeeID,
      first_name,
      last_name,
      hourly_pay: parsedHourlyPay,
      hire_date
    });

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

//get an employee with id

module.exports.getemployeebyId = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.where({ id }).fetch();
    res.json(employee);
  } catch (error) {
     return res.status(500).json(error);
  }
}
