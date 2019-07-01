const connection = require('../connection.js');

const getPosts = () => connection.query('select * from posts ORDER BY id DESC');

module.exports = getPosts;
