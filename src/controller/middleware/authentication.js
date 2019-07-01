exports.auth = (req, res, next) => {
  if (!req.token) {
    next();
  } else {
    return res.redirect(req.token.consultant ? '/consProfile' : '/userProfile');
  }
};
