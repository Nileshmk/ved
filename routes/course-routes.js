const router = require('express').Router();
const superagent = require('superagent');

router.get('/user', (req, res) => {
    res.status(200).json({
        "data": req.user
    });
    // superagent
    // .post('http://35.154.103.69/profile/register/google')
    // .send({ 
    //     "_id":id
    // })
    // .set('Accept', 'application/json')
    // .end((err,res)=>{
    //     done(null,res.body.user);
    // });
});

module.exports = router;