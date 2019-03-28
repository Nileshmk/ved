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
    server: {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000, // reconnect after 1 second(s)
    }
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
    res.render('home', {
        user: req.user
    });
});
var paytm_config = require('./paytm/paytm_config').paytm_config;
var paytm_checksum = require('./paytm/checksum');
var querystring = require('querystring');
app.get('/pay',(req,res)=>{
    // res.redirect('/generate_checksum');
    var paramarray = {};
    paramarray['MID'] = 'wVYycY53728810990844'; //Provided by Paytm
    paramarray['ORDER_ID'] = 'ORDER00020'; //unique OrderId for every request
    paramarray['CUST_ID'] = 'CUST0001';  // unique customer identifier 
    paramarray['INDUSTRY_TYPE_ID'] = 'Retail'; //Provided by Paytm
    paramarray['CHANNEL_ID'] = 'WEB'; //Provided by Paytm
    paramarray['TXN_AMOUNT'] = '1.00'; // transaction amount
    paramarray['WEBSITE'] = 'WEBSTAGING'; //Provided by Paytm
    paramarray['CALLBACK_URL'] = 'http://localhost:3000/callback';//Provided by Paytm
    paramarray['EMAIL'] = 'abc@gmail.com'; // customer email id
    paramarray['MOBILE_NO'] = '9999999999'; // customer 10 digit mobile no.
        paytm_checksum.genchecksum(paramarray, paytm_config.MERCHANT_KEY, function (err, ress) {
            console.log(ress);
            res.render('index',{data:ress});
        });
});

app.post('/callback',(req,res)=>{
    console.log(req.body);
    res.render('callback',{data:req.body});
})

app.post('/callback2',(request,response)=>{
    // console.log(req.body);

        if(paytm_checksum.verifychecksum(request.body, paytm_config.MERCHANT_KEY)) {
            console.log("true");
        }else{
            console.log("false");
        }
            // if checksum is validated Kindly verify the amount and status 
            // if transaction is successful 
        // kindly call Paytm Transaction Status API and verify the transaction amount and status.
        // If everything is fine then mark that transaction as successful into your DB.			
        
    });

app.post('/generate_checksum',(req,res)=>{
    if(request.method == 'POST'){
    var paramarray = {};
        paramarray['MID'] = 'wVYycY53728810990844'; //Provided by Paytm
        paramarray['ORDER_ID'] = 'ORDER00003'; //unique OrderId for every request
        paramarray['CUST_ID'] = 'CUST0001';  // unique customer identifier 
        paramarray['INDUSTRY_TYPE_ID'] = 'Retail'; //Provided by Paytm
        paramarray['CHANNEL_ID'] = 'WEB'; //Provided by Paytm
        paramarray['TXN_AMOUNT'] = '1.00'; // transaction amount
        paramarray['WEBSITE'] = 'WEBSTAGING'; //Provided by Paytm
        paramarray['CALLBACK_URL'] = 'http://localhost:3000/callback';//Provided by Paytm
        paramarray['EMAIL'] = 'abc@gmail.com'; // customer email id
        paramarray['MOBILE_NO'] = '9999999999'; // customer 10 digit mobile no.
            paytm_checksum.genchecksum(paramarray, paytm_config.MERCHANT_KEY, function (err, ress) {
                console.log(ress);
                res.render('index',{data:ress});
            });
    }else{
        response.writeHead(200, {'Content-type' : 'text/json'});
        response.end();
    }
});

app.post('/verify_checksum',(request,response)=>{
});
// app.post('/login', urlencodedParser, (req, res) => {
//     console.log(req.body);
//     superagent
//         .post('http://35.154.103.69/profile/login')
//         .send({
//             "email": req.body.email,
//             "password": req.body.password
//         })
//         .set('Accept', 'application/json')
//         .end((err, ress) => {
//             res.render('profile', {
//                 user: ress.body.user
//             });
//         });
// });

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});