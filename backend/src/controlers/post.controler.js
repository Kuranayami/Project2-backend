import Post from '../models/post.model.js';

// Helper to check ownership
const checkOwnership = (post, userId) => {
  return post.author?.toString() === userId;
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user?._id || req.user?.id;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content required' });
    }

    if (!userId) {
      return res.status(401).json({ message: 'Must be logged in to create post' });
    }

    const post = await Post.create({ 
      title, 
      content,
      author: userId,
      authorName: req.user?.username || req.user?.email || 'Unknown'
    });
    
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user?._id || req.user?.id;
    
    const post = await Post.findById(id);
    
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!checkOwnership(post, userId)) {
      return res.status(403).json({ message: 'You can only edit your own posts' });
    }
    
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();
    
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id || req.user?.id;
    const userRole = req.user?.role;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (userRole !== 'admin' && !checkOwnership(post, userId)) {
      return res.status(403).json({ message: 'You can only delete your own posts' });
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id || req.user?.id;

    if (!userId) return res.status(401).json({ message: 'Must be logged in to like' });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const alreadyLiked = post.likes.some(uid => uid.toString() === userId.toString());

    if (alreadyLiked) {
      await Post.findByIdAndUpdate(id, { $pull: { likes: userId } });
    } else {
      await Post.findByIdAndUpdate(id, { $addToSet: { likes: userId } });
    }

    const updated = await Post.findById(id);
    res.status(200).json({ likes: updated.likes.length, liked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user?._id || req.user?.id;
    
    if (!text) return res.status(400).json({ message: 'Comment text required' });
    
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    post.comments.push({ 
      text,
      author: userId,
      authorName: req.user?.username || 'Anonymous'
    });
    await post.save();
    
    res.status(200).json({ comments: post.comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};