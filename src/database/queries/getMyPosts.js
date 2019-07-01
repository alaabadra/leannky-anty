const connection = require('../connection');

const getMyPosts = userId => connection.query('select * from posts where user_id=$1 ORDER BY id DESC', [userId]);

module.exports = getMyPosts;
