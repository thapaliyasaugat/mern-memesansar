const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: '' },
    coverPic: { type: String, default: '' },
    bio: { type: String, default: '' },
    address: { type: String, default: '' },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    sharedPosts: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false }

}, { timestamps: true })
module.exports = mongoose.model('User', userSchema)