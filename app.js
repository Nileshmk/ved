const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const courseRoutes = require('./routes/course-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const superagent = require('superagent');
const app = express();

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/assets', express.static('assets'));
// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/course', courseRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', {
        user: req.user
    });
});

app.post('/login', urlencodedParser, (req, res) => {
    console.log(req.body);
    superagent
        .post('http://35.154.103.69/profile/login')
        .send({
            "email": req.body.email,
            "password": req.body.password
        })
        .set('Accept', 'application/json')
        .end((err, ress) => {
            res.render('profile', {
                user: ress.body.user
            });
        });
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});