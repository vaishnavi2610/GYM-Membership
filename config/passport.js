const LocalStrategy = require('passport-local').Strategy;

// Load User model
const User = require('../models/User');

//recieving passport from server.js
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      // Match user
        const user = await User.findOne({email: email});
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        if(password === user.password) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Password incorrect' });
        }
      })
    )

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}