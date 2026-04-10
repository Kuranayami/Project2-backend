import { Post } from "../models/post.model.js";

//create a post
const createPost = async (req, res) => {
     try {
        const { name, description, age } = req.body;

    if (!name  || !description || !age) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const post = await Post.create({ name, description, age });
        res.status(201).json({ message: "Post Created Successfully", post });
    } catch (error) {
         res.status(500).json({ message: "Error creating post", error });
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
}

const updatePost = async (req, res) => {
    try {
        //basics validation if the body is empty or not
        if (Object.keys(req.body).length === 0) {
            return res. res.status(400).json({ message: "Request body cannot be empty" });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!post) return res.status(404).json({ message: "Post not found" });

        res.status(200).json({ message: "Post Updated Successfully", post });

    } catch (error) {
        res.stratus(500).json ({ message: "Error updating post", error });
    }
}

const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json ({ message: "Post not found" });
        res.status(200).json ({ message: "Post Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error: error.message });
    }
}

export { createPost, getPosts, updatePost, deletePost };