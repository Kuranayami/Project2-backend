import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    likePost,
    addComment
} from "../controlers/post.controler.js";

const router = Router();

router.route("/getposts").get(getPosts);

router.route("/createpost").post(verifyJWT, createPost);
router.route("/updatepost/:id").patch(verifyJWT, updatePost);
router.route("/deletepost/:id").delete(verifyJWT, deletePost);
router.route("/likepost/:id").post(verifyJWT, likePost);
router.route("/commentpost/:id").post(verifyJWT, addComment);

export default router;