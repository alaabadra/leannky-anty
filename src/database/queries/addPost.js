const connection = require('../connection.js');

const addPost = (title, content, userId) => connection.query('INSERT INTO posts (title, content, user_id) values ($1, $2, $3)', [title, content, userId]);

module.exports = addPost;
