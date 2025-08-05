const mongoose = require ('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
name: {
    type: String,
    required: true
},
userName: {
    type: String,
    required: true,
    unique: true
},
age: {
    type: String,
    required: true,
    unique: true
},
email: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true
},
date: {
    type: Date,
    default: Date.now
},
});
const User = mongoose.model('User', UserSchema);
module.exports = User;