exports.get = (req, res) => {
  if (req.token) {
    res.render('userProfile', {
      layout: 'user',
      js: ['domUser'],
      css: 'user',
      userName: req.token.userName,
    });
  } else {
    res.redirect('/');
  }
};
