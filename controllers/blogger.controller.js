const {blogger} = require("../model/blogger_mode")
const bcrypt = require("bcrypt")

const createBloggerController = async (req, res) => {

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
}

const signInBloggerController = async(req, res) => {
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
        console.log(error);
        res.send(error)
    }
}

module.exports = {
    createBloggerController,
    signInBloggerController
}