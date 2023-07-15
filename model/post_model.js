const mongoose = require("mongoose")

const schema = mongoose.Schema

const postSchema = new schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true,
        enum: ['DIY', 'sports', 'food and ingredients']
    },
    content: {
        type: String,
        required: true
    },
    bloggerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogger"
    }
})

const post = mongoose.model("post", postSchema)

module.exports = {post}