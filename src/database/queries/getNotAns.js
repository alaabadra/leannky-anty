const connection = require('../connection.js');

const getNotAns = () => connection.query('select * from posts where answer is null ORDER BY id DESC');

module.exports = getNotAns;
