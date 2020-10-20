// Authentication checking functions
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/profile');
  }

  next();
}

function isNotLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
};