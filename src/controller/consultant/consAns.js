
exports.get = (req, res) => {
  res.render('consAns', {
    layout: 'cons',
    js: ['domConsHeader'],
    css: 'cons',
    fullName: req.token.fullName,
    data: req.result,
  });
};
