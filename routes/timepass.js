const User = require('../models/user-model');
const mongoose = require('mongoose');
mongoose.connect('mongodb://nil:nilkeshav1@ds227199.mlab.com:27199/vedam', () => {
    console.log('connected to mongodb');
});
const temp = new User.Course({
    _id: new mongoose.Types.ObjectId(),
    name:"c++",
    description:"des c++",
    content:"dum",
    category:"yo",
    durationDays:40,
    durationHours:100,
    fees:1400
},{
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
});
console.log(temp);
temp.save().then(result=>{
    console.log(result);
});