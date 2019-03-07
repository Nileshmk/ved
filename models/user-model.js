const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const userSchema = new Schema({
//    username: String,
//    googleId: String,
//    thumbnail: String
//});
const userSchema = mongoose.Schema({
    
    _id: String,
    firstName: String,
    lastName: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
