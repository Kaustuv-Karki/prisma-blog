import express from "express";
import { createUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", createUser);
router.put("/update/:id", updateUser);

export default router;
