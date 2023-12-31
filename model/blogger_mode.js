const mongoose = require("mongoose")

const schema = mongoose.Schema

const bloggerschema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Tel: {
        type: String,
        required: true
    },
    posts: [{
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    }]
}, {timestamps: true})

const blogger = mongoose.model("blogger", bloggerschema)

module.exports = {blogger}