const bcrypt = require('bcrypt');

exports.hashPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 5, (error, hash) => {
    if (error) {
      res.status(500).send(JSON.stringify({ error: 'Internal Server Error' }));
    } else {
      req.body.password = hash;
      next();
    }
  });
};
