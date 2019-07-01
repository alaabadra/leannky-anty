const getCons = require('../../database/queries/getCons');
const getUser = require('../../database/queries/getUser');

exports.isConsultant = (req, res, next) => {
  getCons(req.body.userName)
    .then((result) => {
      if (result.rows[0]) {
        return res.status(400).send(JSON.stringify({ msg: 'اسم المستخدم موجود مسبقا... اختر  اسم آخر' }));
      }
      next();
    })
    .catch(e => next(e));
};
exports.isUser = (req, res, next) => {
  getUser(req.body.userName)
    .then((result) => {
      if (result.rows[0]) {
        return res.status(400).send(JSON.stringify({ msg: 'اسم المستخدم موجود مسبقا... اختر  اسم آخر' }));
      }
      next();
    })
    .catch(e => next(e));
};
exports.whoExist = (req, res, next) => {
  const { userName } = req.body;
  Promise.all([getUser(userName), getCons(userName)]).then((values) => {
    if (values[0].rows[0]) {
      req.user = {
        type: 'user',
        userName,
        userId: values[0].rows[0].id,
        hashed: values[0].rows[0].password,
      };
      next();
    } else if (values[1].rows[0]) {
      req.user = {
        type: 'consultant',
        userName,
        consId: values[1].rows[0].id,
        fullName: values[1].rows[0].full_name,
        hashed: values[1].rows[0].password,
      };
      next();
    } else {
      req.user = {
        type: 'not found',
      };
      next();
    }
  })
    .catch(e => next(e));
};
