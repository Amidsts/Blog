const mongoose = "mongoose"

const schema = mongoose.Schema

const bloggerschema = new schema({
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
    }
})

const blogger = mongoose.model("blogger", bloggerschema)