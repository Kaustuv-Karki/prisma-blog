import express from "express";
import {
  createPost,
  updatePost,
  getAllPosts,
  getPostById,
  deletePost,
  searchPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", createPost);
router.put("/update/:id", updatePost);
router.get("/get", getAllPosts);
router.get("/get/:id", getPostById);
router.delete("/delete/:id", deletePost);
router.get("/search", searchPosts);

export default router;
