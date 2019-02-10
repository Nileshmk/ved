const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');
const superagent = require('superagent');

passport.serializeUser((user, done) => {
    console.log(user.user._id);
    done(null, user.user._id);
});

passport.deserializeUser((id, done) => {
//    User.findById(id).then((user) => {
//        done(null, user);
//    });
    superagent
        .post('http://35.154.103.69/profile/register/google')
    .send({ 
        "_id":id
    })
    .set('Accept', 'application/json')
    .end((err,res)=>{
        done(null,res.body.user);
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
        superagent
        .post('http://35.154.103.69/profile/register/google')
        .send({ 
            "_id":profile.id,
            "firstName":profile.name.givenName,
            "lastName":profile.name.familyName,
	        "profileURL":profile._json.image.url
        })
        .set('Accept', 'application/json')
        .end((err,res)=>{
            done(null,res.body);
        });
    })
);

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "/auth/facebook/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile.id);
//    superagent
//        .post('http://35.154.103.69/profile/register/google')
//        .send({ 
//            "_id":profile.id,
//            "firstName":profile.name.givenName,
//            "lastName":profile.name.familyName,
//	        "profileURL":profile._json.image.url
//        })
//        .set('Accept', 'application/json')
//        .end((err,res)=>{
//            done(null,res.body);
//        });
  }
));