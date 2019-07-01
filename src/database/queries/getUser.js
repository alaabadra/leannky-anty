const connection = require('../connection.js');

const getUser = userName => connection.query('select * from users where user_name=$1', [userName]);

module.exports = getUser;
