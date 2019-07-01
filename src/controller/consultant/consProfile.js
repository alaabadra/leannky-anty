exports.get = (req, res) => {
  if (req.token) {
    res.render('consProfile', {
      layout: 'cons',
      js: ['domCons', 'domConsHeader'],
      css: 'cons',
      fullName: req.token.fullName,
    });
  } else {
    res.redirect('/');
  }
};
