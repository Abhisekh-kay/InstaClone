const Post = require("../models/Post.js");
const User = require("../models/user.js")

// Create
exports.createPost = async(req,res)=>{
    try{
        const { userId, description, picturepath} = req.body;
        const user= await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturepath: user.picturePath,
            picturepath,
            likes:{},
            comments:[]
        })

        await newPost.save();

        const post = await Post.find();

        res.status(201).json(post)
    }
    catch(err){
        res.status(409). json({message: err.message})
    }
}

// Read

exports.getFeedPosts = async(req,res)=>{
    try{
        const post = await Post.find();

        res.status(200).json(post)
    }
    catch(err){
        res.status(404). json({message: err.message})
    }
}

exports.getUserPosts = async(req,res)=>{
    try{
        const {userId} = req.body;
        const post = await Post.find({userId})
        res.status(200).json(post)
    }
    catch(err){
        res.status(404). json({message: err.message})
    }
}

// Update

exports.likePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post =await Post.findById(id);
        const isLiked = post.Likes.get(userId)

        if(isLiked){
            post.likes.delete(userId)
        }

        else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )

        res.status(200).json(updatedPost)
    }
    catch(err){
        res.status(404). json({message: err.message})
    }
}