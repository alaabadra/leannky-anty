const addAns = require('../../database/queries/addAns');
const { server } = require('../error');

exports.post = (req, res) => {
  if (req.token) {
    const postId = req.body.id;
    const { answer } = req.body;
    const consultantId = req.token.userId;
    addAns(answer, consultantId, postId)
      .then((result) => {
        if (result.rowCount) {
          res.status(200).send({ msg: 'ok' });
        } else {
          res.status(400).send({ msg: null });
        }
      })
      .catch(e => server(e, req, res, null));
  } else {
    res.redirect('/');
  }
};
