const connection = require('../connection.js');

const addAns = (answer, consultant_id, post_id) => connection.query(`UPDATE posts
SET answer = $1, consultant_id = $2 where id = $3 returning *`, [answer, consultant_id, post_id]);

module.exports = addAns;
