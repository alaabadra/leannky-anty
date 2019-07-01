const { verify } = require('jsonwebtoken');

exports.getToken = (req, res, next) => {
  if (req.cookies && req.cookies.jwt) {
    verify(req.cookies.jwt, process.env.SECRET, (error, payload) => {
      if (error) {
        res.clearCookie('jwt');
        res.status(401).send({ msg: 'Unauthorized' });
      } else {
        req.token = payload;
        next();
      }
    });
  } else {
    next();
  }
};
