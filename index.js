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
 */


const express = require("express")
const mongoose = require("mongoose")
const {blogger} = require("./model/blogger_mode")
const {post} =require("./model/post_model")
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


app.get("/greet", async (req, res) => {

   try {
    
    const newBlogger = await new blogger({
        userName: "Amidst",
        password: "ggskyt335|ghs",
        email: "amidst@gmail.com",
        Tel: "09056789987"
    }).save()

    res.send(newBlogger)

   } catch (error) {
    console.log(error);
        res.send(error)
   }
})

app.post("/sign_up", async (req, res) => {

    try {

        const salt = bcrypt.genSaltSync(10)

        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        const data = {
            userName: req.body.userName,
            password: hashedPassword,
            email: req.body.email,
            Tel: req.body.Tel
        }

        const userExists = await blogger.findOne({email: data.email})

        if (userExists) {
            throw new Error("email already exists")
        }

        const newblogger = await new blogger(data).save()

        res.send({
            data: newblogger
        })

    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


app.post("/sign_in", async(req, res) => {
    try {
        const data =  {
            email: req.body.email,
            password: req.body.password
        }

        const bloggerExists = await blogger.findOne({
            email: data.email
        })

        console.log(bloggerExists);

        if (!bloggerExists) {
            res.send("invalid credential")
        }

        const passwordSame = bcrypt.compareSync(data.password, bloggerExists.password)

        if (!passwordSame) {
            res.send("invalid credential")
        }

        res.send({message: "sign in successfully"})

    } catch (error) {
        
        res.send(error)
    }
})

app.post("/create_post", async (req, res) => {
    try {
        const newPost = await new post({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            content: req.body.content,
            bloggerId: req.body.bloggerId
        }).save()

        res.send({
            data: newPost
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})