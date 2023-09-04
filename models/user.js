const bookshelf = require('../db');

const User = bookshelf.model('users', {
  tableName: 'user',
});

module.exports = User;