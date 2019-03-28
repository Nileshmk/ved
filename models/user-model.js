const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    _id: String,
    firstName: String,
    lastName: String,
    profileURL:String,
    email: String,
    phone: String,
    college: String,
    Branch: String,
    year: Number
});

const courseSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    description:String,
    content:String,
    category:String,
    durationDays:Number,
    durationHours:Number,
    fees:Number,
    discount: Number,
    maxUser: Number
});
module.exports = {
    "Profile":mongoose.model('profile', userSchema),
    "Course":mongoose.model('course', courseSchema)
};
