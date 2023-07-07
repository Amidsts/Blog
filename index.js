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
const blogger = require("./model/blogger_mode")

const port = 8000

const app = express()

async function connectDb () {
    try {
        await mongoose.connect("mongodb://localhost:27017/Blog")

        console.log("connected to the database successfully")
    } catch (error) {
        console.log("unable to connect to the database");
    }
}

connectDb()


app.get("/greet", (req, res) => {
    res.write("welcome")
    res.write("hello world!")
    
    res.end()
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})