const getNotAns = require('../../database/queries/getNotAns');
const getConsAns = require('../../database/queries/getConsAns');

exports.renderNotAns = (req, res, next) => {
  if (req.token) {
    getNotAns()
      .then((result) => {
        req.result = result.rows;
        next();
      })
      .catch(e => next(e));
  } else {
    res.redirect('/');
  }
};
exports.renderConsAns = (req, res, next) => {
  if (req.token) {
    getConsAns(req.token.userId)
      .then((result) => {
        req.result = result.rows;
        next();
      })
      .catch(e => next(e));
  } else {
    res.redirect('/');
  }
}
