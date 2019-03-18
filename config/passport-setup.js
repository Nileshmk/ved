const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');
const superagent = require('superagent');

passport.serializeUser((user, done) => {
    // console.log("good morning: ",user._id);
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    console.log(id);
    User.Profile.findOne({ _id: id}).then(currentUser => {
        if (currentUser) {
            done(null,currentUser);
        }
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        // console.log(profile.emails[0].value);
        User.Profile.findOne({ _id: profile.id.toString() }).then(currentUser => {
            if (currentUser) {
              done(null,currentUser);
            } else {
              const profile1 = new User.Profile(
                {
                  _id: profile.id.toString(),
                  firstName: profile.name.givenName,
                  lastName: profile.name.familyName,
                  email: profile.emails[0].value,
                  profileURL: profile._json.image.url,
                },
                { toJSON: { virtuals: true }, toObject: { virtuals: true } }
              );
              profile1
                .save()
                .then(result => {
                //   console.log("This is what ",result);
                    done(null,result);
                })
                .catch(err => console.log(err));
            }
          });
    })
);