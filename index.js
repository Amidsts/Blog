/** CRUD OPERATION
 * C --- create => POST
 * R - Read => get
 * U -- update = PUT
 * D -- Delete = Delete method
 * 
 * http methods :
 * POST method
 * PUT method
 * GET method
 * DELETE method
 * 
 * PATHS: 
 * relative path
 * absolute path
 * MVC ==> model, views and controller
 * routes folder
 */


const express = require("express")
const mongoose = require("mongoose")
const {blogger} = require("./model/blogger_mode")
const {post} =require("./model/post_model")
const {
    createBloggerController,
    signInBloggerController
} = require("./controllers/blogger.controller")
const {
    createPostController,
    getPost,
    getPosts,
    updatePost,
    deletePost
} = require("./controllers/post.controller")
const bcrypt = require("bcrypt")


const dotenv = require("dotenv")

const port = 8000

const app = express()

app.use(express.json())
dotenv.config()

async function connectDb () {
    try {

        await mongoose.connect(process.env.dbUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log("connected to the database successfully")
    } catch (error) {
        console.log("unable to connect to the database");
    }
}

connectDb()


//new blogger
app.post("/sign_up", createBloggerController)


app.post("/sign_in", signInBloggerController)

app.post("/create_post", createPostController)
app.get("/post/:postId", getPost)
app.get("/posts", getPosts)
app.put("/update_post/:postId", updatePost)
app.delete("/delete_post/:postId", deletePost)

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})