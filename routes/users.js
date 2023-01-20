var express = require('express');
const { login, Register, confirmAccount, getProfile, forgotPassword, resetPassword, newPassword } = require('../controllers/users/users');
var router = express.Router();

/* GET users listing. */
router.post('/login',login)
router.post('/register',Register)
router.get('/confirmAccount/:confirmationToken', confirmAccount)
router.get('/getprofile', getProfile)
router.post('/forgot-password', forgotPassword)
router.get('/reset-password/:token', resetPassword)
router.post('/new-password/:token', newPassword)


module.exports = router;
