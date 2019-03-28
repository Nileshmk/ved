const router = require('express').Router();
const superagent = require('superagent');
const User = require('../models/user-model');
router.get('/user', (req, res) => {
    res.status(200).json({
        "data": req.user
    });
});

router.get('/',(req,res)=>{
    course = User.Course.find({}).then(courses=>{
        console.log(courses);
        if(courses){
            res.render('course',{user: req.user,
                courses: courses});
        }
        else{
            res.render('error');
        }
    })
});

router.get('/course',(req,res)=>{
    console.log(req.query.id);
    course = User.Course.findOne({_id:req.query.id}).then(courses=>{
        console.log(courses);
        if(courses){
            res.render('singlecourse',{user: req.user, course: courses});
        }
        else{
            res.render('error');
        }
    })
});

router.get('/join',(req,res)=>{
    console.log(req.query.id);
    if(req.user==undefined){
        res.redirect('/auth/login');
    }
    else{
        course = User.Course.findOne({_id:req.query.id}).then(courses=>{
            console.log(courses);
            if(courses){
                res.render('join',{user: req.user, course: courses});
            }
            else{
                res.render('error');
            }
        })
    }
})

router.post('/addFriend',(req,res,next)=>{
    console.log("This is data",req.body.email);
    User.Profile.findOne({email:req.body.email})
    .then(user=>{
        console.log(user);
        if(user && user.email!=req.user.email){
            res.status(200).json({
                user:user
            })
        }
        else{
            res.status(200).json({
                "message":"user not found"
            })
        }
    })
});

module.exports = router;