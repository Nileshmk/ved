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
    lastName: String,
    email: String,
    password: String,
    profileURL: String,
    profileType:{
        type: String,
        enum:['google','normal','facebook']
    },
    profilePhoto:{
        data:Buffer,
        contentType: String
    },
    employment: {type: String, default: null},
    education: {type: String, default: null},
    collegeName: {type: String, default: null},
    location: {type: String, default: null},
    description: {type: String, default: null}
    
});

const User = mongoose.model('user', userSchema);

module.exports = User;
