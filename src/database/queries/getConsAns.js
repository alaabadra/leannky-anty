const connection = require('../connection');

const getConsAns = consultantId => connection.query('select * from posts where consultant_id=$1 ORDER BY id DESC', [consultantId]);

module.exports = getConsAns;
