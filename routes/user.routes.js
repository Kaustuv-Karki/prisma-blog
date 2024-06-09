import express from "express";
import {
  createUser,
  updateUser,
  getAllUsers,
  getUsersById,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", createUser);
router.put("/update/:id", updateUser);
router.get("/get", getAllUsers);
router.get("/get/:id", getUsersById);
router.delete("/delete/:id", deleteUser);

export default router;
