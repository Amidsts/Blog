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

const port = 8000

const app = express()

async function connectDb () {
    try {
        await mongoose.connect("mongodb://localhost:27017/Blog", {
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

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})