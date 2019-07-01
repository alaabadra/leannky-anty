const router = require('express').Router();
const home = require('./home');
const userQ = require('./user/userQ');
const userProfile = require('./user/userProfile');
const { signupValidation, qUserValidation, loginValidation } = require('./middleware/validation');
const { getToken } = require('./middleware/getToken');
const { auth } = require('./middleware/authentication');
const { isConsultant, isUser, whoExist } = require('./middleware/isfound');
const { hashPassword } = require('./middleware/hashPassword');
const userPrevQ = require('./user/userPrevQ');
const { renderAllPosts } = require('./middleware/renderAllPosts');
const userMyProfile = require('./user/userMyProfile');
const { renderMyPosts } = require('./middleware/renderMyPosts');
const consProfile = require('./consultant/consProfile');
const { renderNotAns, renderConsAns } = require('./middleware/renderForCons');
const getNotAns = require('./consultant/consGetNotAns');
const addans = require('./consultant/addAns');
const consAns = require('./consultant/consAns');

router.get('/', getToken, home.get);
router.get('/userq', getToken, userQ.get);
router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
});
router.get('/userProfile', getToken, userProfile.get);
router.get('/consProfile', getToken, consProfile.get);
router.get('/getNotAns', getToken, renderNotAns, getNotAns.get);
router.get('/consAns', getToken, renderConsAns, consAns.get);

router.post('/signup', signupValidation, getToken, auth, isConsultant, isUser, hashPassword, home.signupPost);
router.post('/userq', qUserValidation, getToken, userQ.post);
router.post('/login', loginValidation, whoExist, home.loginPost);
router.post('/addans', getToken, addans.post);

router.get('/userPrevQ', getToken, renderAllPosts, userPrevQ.get);
router.get('/userMyProfile', getToken, renderMyPosts, userMyProfile.get);
router.post('/signup', signupValidation, home.signupPost);
module.exports = router;
