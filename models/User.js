const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type:String, default:''},
    password: {type:String, default:''},
    isAdmin: {type:Boolean, default:false},
    timestamp: {type:Date, default:Date.now}
});

module.exports = mongoose.model('User', userSchema);