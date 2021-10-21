const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
      type: String, 
      unique: true, 
      required: true, 
      index: true
    },
    email: {
      type: String, 
      lowercase: true, 
      unique: true, 
      required: true
    },
    password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: false
    }
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;