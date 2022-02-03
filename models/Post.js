const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    desc: { type: String, max: 500 },
    image: { type: String, },
    userId: { type: String, required: true },
    likes: { type: Array, default: [] },
    comments: [
        {
            userId: { type: String, required: true },
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        }
    ],
    sharedBy: { type: Array, default: [] }

}, { timestamps: true })
module.exports = mongoose.model('Post', postSchema)