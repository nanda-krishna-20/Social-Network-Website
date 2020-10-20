const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter');
const bcrypt = require('bcrypt');

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
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: `${process.env.BASE_URL}/login/auth/facebook/callback`,
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
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.BASE_URL}/login/auth/google/callback`,
    profileFields: ['id'],
  }, (accessToken, refreshToken, profile, done) => {
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

  passport.use('twitter-login', new GoogleStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: `${process.env.BASE_URL}/login/auth/twitter/callback`,
    profileFields: ['id'],
  }, (accessToken, tokenSecret, profile, done) => {
    db.User.findOne({
      where: {
        twitterId: JSON.stringify(profile.id),
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
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: `${process.env.BASE_URL}/signUp/auth/facebook/callback`,
    profileFields: ['id', 'emails', 'name', 'gender'],
  },
  (accessToken, refreshToken, profile, done) => {
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
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.BASE_URL}/signUp/auth/google/callback`,
    profileFields: ['id', 'emails', 'name', 'gender'],
  }, (accessToken, refreshToken, profile, done) => {
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

  passport.use('twitter-signup', new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: `${process.env.BASE_URL}/signUp/auth/twitter/callback`,
    profileFields: ['id', 'emails', 'name', 'gender'],
  }, (accessToken, tokenSecret, profile, done) => {
    bcrypt.hash(JSON.stringify(accessToken), 10).then((hashedPassword) => {
      db.User.findOrCreate({
        where: {
          twitterId: JSON.stringify(profile.id),
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

        return done(null, false, { message: 'This twitter account is already registered' });
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
