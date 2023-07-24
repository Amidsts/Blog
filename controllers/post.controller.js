const {post} = require("../model/post_model")

//CRUD operation

const createPostController = async (req, res) => {
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
}

const getPost = async (req, res) => {
    try {
        const get_post = await post.findOne({_id: req.params.postId})

        res.send({
            data: get_post
        })
    } catch (error) {
        console.log(error)
    }
}

const getPosts = async (req, res) => {
    try {
        const get_posts = await post.find()

        res.send({
            data: get_posts
        })
    } catch (error) {
        console.log(error);
    }
}


const updatePost = async (req, res) => {
    try {

        const Post = await post.findById(req.params.id)

        const update_post = await post.updateOne(
            {_id: req.params.postId},
            {
                title: req.body.title || post.title,
                description: req.body.description || post.description,
                category: req.body.category || post.category,
                content: req.body.content || post.content,
                bloggerId: req.body.bloggerId || post.bloggerId
            }
        )

        res.send({
            data: "post has been updated successfully"
        })
    } catch (error) {
        console.log(error);
    }
} 

const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId
        
        await post.findByIdAndDelete(postId)

        res.send({
            data: "post has been deleted successfully"
        })

    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    createPostController,
    getPost,
    getPosts,
    updatePost,
    deletePost
}