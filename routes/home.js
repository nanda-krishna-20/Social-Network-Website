const express = require('express');
const { isLoggedIn } = require('../controllers/helperFunctions/loggedInCheck');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
  res.render('home');
});

module.exports = router;
