const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt = require('bcrypt');
const { facebookAuth, googleAuth } = require('./auth');

function initialize(passport, db) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    db.User.findOne({
      where: {
        email,
      },
    }).then((user) => {
      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }

      bcrypt.compare(password, user.password)
        .then((validPassword) => {
          if (validPassword) {
            return done(null, user);
          }

          return done(null, false, { message: 'Password Incorrect' });
        })
        .catch((err) => done(err));
    }).catch((err) => done(err));
  }));

  passport.use('facebook-login', new FacebookStrategy({
    clientID: facebookAuth.clientID,
    clientSecret: facebookAuth.clientSecret,
    callbackURL: facebookAuth.callbackURLLogin,
    profileFields: ['id'],
  }, (accessToken, refreshToken, profile, done) => {
    db.User.findOne({
      where: {
        facebookId: JSON.stringify(profile.id),
      },
    }).then((user) => {
      if (!user) {
        return done(null, false, { message: 'This facebook account is not registered' });
      }

      bcrypt.compare(accessToken, user.password)
        .then((validPassword) => {
          if (validPassword) {
            return done(null, user);
          }

          return done(null, false, { message: 'Password Incorrect' });
        })
        .catch((err) => done(err));
    }).catch((err) => done(err));
  }));

  passport.use('google-login', new GoogleStrategy({
    clientID: googleAuth.clientID,
    clientSecret: googleAuth.clientSecret,
    callbackURL: googleAuth.callbackURLLogin,
    profileFields: ['id'],
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    db.User.findOne({
      where: {
        googleId: JSON.stringify(profile.id),
      },
    }).then((user) => {
      if (!user) {
        return done(null, false, { message: 'This google account is not registered' });
      }

      bcrypt.compare(accessToken, user.password)
        .then((validPassword) => {
          if (validPassword) {
            return done(null, user);
          }

          return done(null, false, { message: 'Password Incorrect' });
        })
        .catch((err) => done(err));
    }).catch((err) => done(err));
  }));

  passport.use('facebook-signup', new FacebookStrategy({
    clientID: facebookAuth.clientID,
    clientSecret: facebookAuth.clientSecret,
    callbackURL: facebookAuth.callbackURLSignUp,
    profileFields: ['id', 'emails', 'name', 'gender'],
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile);

    bcrypt.hash(JSON.stringify(accessToken), 10).then((hashedPassword) => {
      db.User.findOrCreate({
        where: {
          facebookId: JSON.stringify(profile.id),
        },
        defaults: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          gender: profile.gender,
          username: profile.name.givenName + profile.name.familyName + profile.provider,
          email: profile.emails[0].value,
          password: hashedPassword,
        },
      }).then(([user, created]) => {
        if (created) {
          return done(null, user);
        }

        return done(null, false, { message: 'This facebook account is already registered' });
      }).catch((err) => done(err));
    }).catch((err) => done(err));
  }));

  passport.use('google-signup', new GoogleStrategy({
    clientID: googleAuth.clientID,
    clientSecret: googleAuth.clientSecret,
    callbackURL: googleAuth.callbackURLSignUp,
    profileFields: ['id', 'emails', 'name', 'gender'],
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    bcrypt.hash(JSON.stringify(accessToken), 10).then((hashedPassword) => {
      db.User.findOrCreate({
        where: {
          googleId: JSON.stringify(profile.id),
        },
        defaults: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          gender: profile.gender,
          username: profile.name.givenName + profile.name.familyName + profile.provider,
          email: profile.emails[0].value,
          password: hashedPassword,
        },
      }).then(([user, created]) => {
        if (created) {
          return done(null, user);
        }

        return done(null, false, { message: 'This facebook account is already registered' });
      }).catch((err) => done(err));
    }).catch((err) => done(err));
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.User.findOne({ where: { id } })
      .then((user) => {
        console.log(user);
        done(null, user);
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
}

module.exports = initialize;
