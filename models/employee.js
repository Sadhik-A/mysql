const bookshelf = require('../db');

const Employee = bookshelf.model('employees', {
  tableName: 'employee',
});

module.exports = Employee;
