import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  authorName: { type: String, default: 'Anonymous' },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    authorName: { type: String, default: 'Unknown' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [commentSchema]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;