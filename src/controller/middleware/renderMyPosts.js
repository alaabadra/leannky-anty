const getMyPosts = require('../../database/queries/getMyPosts');

exports.renderMyPosts = (req, res, next) => {
  if (req.token) {
    getMyPosts(req.token.userId)
      .then((result) => {
        req.result = result.rows;
        next();
      })
      .catch(e => next(e));
  } else {
    res.redirect('/');
  }
};
