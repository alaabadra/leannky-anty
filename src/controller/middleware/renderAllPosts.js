const getPosts = require('../../database/queries/getPosts');

exports.renderAllPosts = (req, res, next) => {
  getPosts()
    .then((result) => {
      req.result = result.rows;
      next();
    })
    .catch(e => next(e));
};
