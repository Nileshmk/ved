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
    maxUser: Number,
    location:[String],
    site: String
});

const courseEnrolled = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    courseId: mongoose.Schema.Types.ObjectId,
    studentId: String,
    paymentId: String,
    location: String,
    predate: String
});

const PaymentId = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    date:Date,
    amount: Number,
    email:[String],
    location: String,
    predate: String,
    courseId: mongoose.Schema.Types.ObjectId
});

module.exports = {
    "Profile":mongoose.model('profile', userSchema),
    "Course":mongoose.model('course', courseSchema),
    "Enrolled":mongoose.model('enrolled', courseEnrolled),
    "Payment":mongoose.model('paymentId', PaymentId)
};
