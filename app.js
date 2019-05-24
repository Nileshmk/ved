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
const User = require('./models/user-model');
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
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
const options =  {
    useMongoclient:true
    // server: {
    //     reconnectTries: Number.MAX_VALUE,
    //     reconnectInterval: 1000, // reconnect after 1 second(s)
    // }
};
mongoose.connect(keys.mongodb.dbURI,options, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/course', courseRoutes);

// create home route
app.get('/', (req, res) => {
    res.redirect('/course');
});

var paytm_config = require('./paytm/paytm_config').paytm_config;
var paytm_checksum = require('./paytm/checksum');
var querystring = require('querystring');

app.post('/pay',(req,res)=>{
    // res.redirect('/generate_checksum');
    req.body.email.push(req.user.email);
    console.log(req.body.email,req.user.email);
    let s = "http://localhost:4000/paywithpaytm?amount=";
    s = s+req.body.amount+"&id=";
    const payment = new User.Payment({
        _id:new mongoose.Types.ObjectId(),
        email:req.body.email,
        amount: req.body.amount,
        courseId: req.body.id,
        predate: req.body.date,
        location: req.body.location
    },{
        toJSON: {
          virtuals: true
        },
        toObject: {
          virtuals: true
        }
    });
    payment.save().then((result)=>{
        if(result){
            s = s+(payment._id.toString());
            res.status(200).json({
                link:s
            });
        }
    });
    
});

app.post('/payment',(req,res)=>{
    User.Payment.findOne({_id:req.body.response.ORDERID}).then(result=>{
        console.log(result);
        if(result && req.body.response.STATUS == 'TXN_SUCCESS'){
            console.log('done',result.email);
            for(let i = 0;i<result.email.length;i++){
                console.log(result.email[i]);
                User.Profile.findOne({email:result.email[i]}).then(profile=>{
                    console.log(profile);
                    const temp = new User.Enrolled({
                        _id:new mongoose.Types.ObjectId(),
                        paymentId: result._id,
                        studentId: profile._id,
                        courseId: result.courseId,
                        location: result.location,
                        predate: result.predate
                    });
                    temp.save().then(re=>{
                        console.log(re);
                    })
                })
            }
            console.log(result);
        }
    })
    console.log(req.body);
    res.send("hello");
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});