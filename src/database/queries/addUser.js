const connction = require('../connection');

const addUser = (userName, password) => connction.query('INSERT INTO users (user_name, password) values($1,$2) returning *', [userName, password]);

module.exports = addUser;
