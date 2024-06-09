import express from "express";
import {
  createPost,
  updatePost,
  getAllPosts,
  getPostById,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", createPost);
router.put("/update/:id", updatePost);
router.get("/get", getAllPosts);
router.get("/get/:id", getPostById);
router.delete("/delete/:id", deletePost);

export default router;
