const express = require('express');
const bcrypt = require('bcrypt');
const { isLoggedIn } = require('../controllers/helperFunctions/loggedInCheck');
const validate = require('../controllers/helperFunctions/validationResultHandler');

const router = express.Router();

// Sign Up page
router.get('/', isLoggedIn, (req, res) => {
  res.render('signUp');
});

// Facebook Sign Up route
router.get('/auth/facebook', passport.authenticate('facebook-signup', { scope: ['email'] }));

// Facebook Sign Up callback route
router.get('/auth/facebook/callback', passport.authenticate('facebook-signup', {
  successRedirect: '/login',
  failureRedirect: '/signup',
  failureFlash: true,
}));

// Google Sign Up route
router.get('/auth/google', passport.authenticate('google-signup', { scope: ['email'] }));

// Google Sign Up callback route
router.get('/auth/google/callback', passport.authenticate('google-signup', {
  successRedirect: '/login',
  failureRedirect: '/signup',
  failureFlash: true,
}));

// Twitter Sign Up route
router.get('/auth/twitter', passport.authenticate('twitter-signup', { scope: ['email'] }));

// Twitter Sign Up callback route
router.get('/auth/twitter/callback', passport.authenticate('twitter-signup', {
  successRedirect: '/login',
  failureRedirect: '/signup',
  failureFlash: true,
}));

// Local Sign up route
router.post('/signUp', isLoggedIn, [
  // First Name and Last Name should be of atmost 50 characters long
  check('firstName').isLength({ max: 50 }),
  check('lastName').isLength({ max: 50 }),
  // Email should be email
  check('email', 'Email Invalid').isEmail(),
  // Length of password must be between 8 and 16 characters
  check('password', 'The password must be 8 to 16 characters long and must contain an uppercase letter, a lowercase letter and a digit').matches('/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8, 16}$/', 'i'),
], validate, async (req, res) => {
  const {
    firstName, lastName, gender, username, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      db.User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          firstName,
          lastName,
          gender,
          username,
          email,
          hashedPassword,
        },
      }).then(([user, created]) => {
        if (created) {
          console.log(user);
          return res.render('login');
        }

        console.log(user);
        return res.render('signUp', { message: 'User already exists' });
      }).catch((err) => res.end(err.message));
    })
    .catch((err) => res.render('signUp', { message: err.message }));
});

module.exports = router;
