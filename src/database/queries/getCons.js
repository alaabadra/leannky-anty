const connection = require('../connection');

const getCons = userName => connection.query('select * from consultant where user_name = $1', [userName]);

module.exports = getCons;
