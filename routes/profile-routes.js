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
    superagent
        .post('http://35.154.103.69/course/myCreatedCourses')
        .send({
            "id": req.user._id
        })
        .set('Accept', 'application/json')
        .end((err, ress) => {
            console.log(ress.body);
            res.render('profile', {
                user: req.user,
                courses: ress.body
            });
        });
});


module.exports = router;