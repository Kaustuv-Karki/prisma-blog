import { Router } from "express";
import userRouter from "./user.routes.js";
import postRouter from "./post.routes.js";
import commentRouter from "./comment.routes.js";

const router = Router();

router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/comments", commentRouter);

export default router;
