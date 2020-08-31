const passportJwt = require('passport-jwt');
// const mongoose = require('mongoose');
const User = require('../models/user.model');

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETORKEY;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      console.log('Payload', payload);
      User.findById(payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }

          return done(null, user);
        })
        .catch((err) => console.log(err));
    })
  );
};
