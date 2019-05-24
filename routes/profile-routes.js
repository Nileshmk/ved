const router = require('express').Router();
const User = require('../models/user-model');
const superagent = require('superagent');

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    const course = User.Enrolled.find({studentId:req.user._id}).then(coursess=>{
        res.render('profile', {
            user: req.user,
            courses: coursess
        });
    })
});


module.exports = router;