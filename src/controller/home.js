const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const addUser = require('../database/queries/addUser');
const { server } = require('./error');

exports.get = (req, res) => {
  if (req.token) {
    if (req.token.consultant) {
      res.redirect('/consProfile');
    } else if (!req.token.consultant) {
      res.redirect('/userProfile');
    }
  } else {
    res.render('home', {
      js: ['domLogin', 'domSignup'],
      css: 'loginSignup',
    });
  }
};
exports.signupPost = (req, res) => {
  const { userName, password } = req.body;
  addUser(userName, password)
    .then((result) => {
      if (result.rows[0]) {
        return res.status(200).send(JSON.stringify({
          msg: 'تم انشاء الحساب بنجاح، يمكنكي الآن تسجيل الدخول' }));
      }
      return res.status(400).send(JSON.stringify({ msg: 'لم يتم إنشاء الحساب مع الأسف' }));
    })
    .catch(err => res.status(500).send(JSON.stringify({ msg: err })));
};
exports.loginPost = (req, res) => {
  if (req.user.type === 'user') {
    compare(req.body.password, req.user.hashed, (err, match) => {
      if (err) {
        server(err, req, res, null);
      }
      if (match) {
        const userInfo = {
          userName: req.body.userName,
          userId: req.user.userId,
          consultant: false,
          loggedIn: true,
        };
        const jwt = sign(userInfo, process.env.SECRET);
        res.cookie('jwt', jwt, {
          maxAge: 60 * 60 * 24 * 30,
          httpOnly: true,
        });
        res.status(302).send(JSON.stringify({ msg: '', redirect: 'userProfile' }));
      } else {
        res.status(401).send(JSON.stringify({ msg: 'كلمة المرور خطأ' }));
      }
    });
  } else if (req.user.type === 'consultant') {
    compare(req.body.password, req.user.hashed, (err, match) => {
      if (err) {
        server(err, req, res, null);
      }
      if (match) {
        const consInfo = {
          userName: req.body.userName,
          userId: req.user.consId,
          fullName: req.user.fullName,
          consultant: true,
          loggedIn: true,
        };
        const jwt = sign(consInfo, process.env.SECRET);
        res.cookie('jwt', jwt, {
          maxAge: 60 * 60 * 24 * 30,
          httpOnly: true,
        });
        res.status(302).send(JSON.stringify({ msg: '', redirect: 'consProfile' }));
      } else {
        res.status(401).send(JSON.stringify({ msg: 'كلمة المرور خطأ' }));
      }
    });
  } else {
    res.status(401).send(JSON.stringify({ msg: 'اسم المستخدم غير موجود' }));
  }
};
