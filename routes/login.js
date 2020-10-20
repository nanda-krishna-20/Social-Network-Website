const express = require('express');
const { check, validationResult } = require('express-validator');
const { isLoggedIn } = require('../controllers/helperFunctions/loggedInCheck');
const validate = require('../controllers/helperFunctions/validationResultHandler');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
  res.render('login');
});

// Passport-Local authentication route
router.post('/', isLoggedIn, [
  // Email should be email
  check('email', 'Email Invalid').isEmail(),
  // Length of password must be between 8 and 16 characters
  // eslint-disable-next-line no-useless-escape
  check('password', 'The password must be 8 to 16 characters long and must contain an uppercase letter, a lowercase letter and a digit').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8, 16}$/, 'i'),
], validate, passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}), (err, req, res, next) => {
  if (err) next(err);
});

// Facebook authentication route
router.get('/auth/facebook', passport.authenticate('facebook-login', { scope: ['email'] }));

// Facebook authentication callback route
router.get('/auth/facebook/callback', passport.authenticate('facebook-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));

// Google authentication route
router.get('/auth/google', passport.authenticate('google-login', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// Google authentication callback route
router.get('/auth/google/callback', passport.authenticate('google-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));

// Twitter authentication route
router.get('/auth/twitter', passport.authenticate('twitter-login'));

// Twitter authentication callback route
router.get('/auth/twitter/callback', passport.authenticate('twitter-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));

// Linkedin authentication route
router.get('/auth/linkedin', passport.authenticate('linkedin-login'));

// Linkedin authentication callback route
router.get('/auth/linkedin/callback', passport.authenticate('linkedin-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));

module.exports = router;
