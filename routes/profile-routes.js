const router = require('express').Router();
const superagent = require('superagent');

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {

    res.render('profile', {
        user: req.user,
    });
});

router.get('/course', (req, res) => {
    res.render('course', {
        user: req.user
    });
});



module.exports = router;