const prisma = require("../lib/prisma");


const getPost = async (req, res) =>{
    const id = req.params.id;
    // console.log(id);

    try{
        const post = await prisma.post.findUnique({
            where:{
                id: id
            }
        })

        res.status(200).json(post);
    } catch(err){
        res.status(500).json("Failed to get the blog post!");
    }
}

const getPosts = async (req, res) =>{
    try{
        const posts = await prisma.post.findMany();

        res.status(200).json(posts);
    } catch(err){
        res.status(500).json("Failed to get the blog posts!");
    }
}


const getCategoryPosts = async (req, res)=>{
    const category = req.query.category;
    // console.log(category);
    try{
        const posts = await prisma.post.findMany({
            where:{
                category: category
            }
        })
              
        res.status(200).json(posts);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const addPost = async (req, res) =>{
    const {title, content, excerpt, image, postedBy, userId, category} = req.body;
    // console.log(req.body);

    try{
        const newPost = await prisma.post.create({
            data:{
                title,
                content,
                excerpt,
                image,
                postedBy,
                userId,
                category
            }
        })

        res.status(200).json(newPost);
    } catch(err){
        res.status(500).json("Failed to add the blog post!");
    }
}


const profilePosts = async (req, res) =>{
    const id = req.params.id;

    try{
        const posts = await prisma.post.findMany({
            where:{
                userId: id
            }
        })

        res.status(200).json(posts);
    } catch(err){
        res.status(500).json({message: "Failed to fetch posts!"});
    }
}

const deletePost = async (req, res) =>{
    const id = req.params.id;

    try{
        const post = await prisma.post.delete({
            where:{
                id
            }
        });

        res.status(200).json("Post deleted");
    } catch(err){
        res.status(500).json("Failed to delete the post!");
    }
}


const updatePost = async (req, res) =>{
    const id = req.params.id;
    const {title, content, excerpt, image, category} = req.body;

    try{
        const post = await prisma.post.update({
            where:{
                id: id
            },
            data:{
                title,
                content,
                excerpt,
                image,
                category
            }
        })

        res.status(200).json(post);
    } catch(err){
        res.status(500).json("Failed to update the post!");
    }
}

module.exports = {getPost, getPosts, getCategoryPosts, addPost, profilePosts, deletePost, updatePost}