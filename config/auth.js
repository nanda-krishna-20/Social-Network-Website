module.exports = {
  facebookAuth: {
    clientID: '386617015688777',
    clientSecret: 'eb5989b7aed0e1e25fd8a9baa966a381',
    callbackURLSignUp: 'http://localhost:8000/signUp/auth/facebook/callback',
    callbackURLLogin: 'http://localhost:8000/login/auth/facebook/callback',
  },
  googleAuth: {
    clientID: '503262518778-aho601d1etmbtg01tgcfo6q8tlf1omh5.apps.googleusercontent.com',
    clientSecret: '9FOQfFnrj92UZALwIRN_nq0p',
    callbackURLSignUp: 'http://localhost:8000/signUp/auth/google/callback',
    callbackURLLogin: 'http://localhost:8000/login/auth/google/callback',
  },
};
