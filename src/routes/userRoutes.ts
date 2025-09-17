import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../controllers/userController";
import { authenticateJWT } from "../middlewares/auth";

export const router = Router();

router.get("/users", authenticateJWT, getAllUsers);
router.get("/user/:id", authenticateJWT, getOneUser);
router.post("/user", authenticateJWT, createUser);
router.delete("/user/:id", authenticateJWT, deleteUser);
router.put("/user/:id", authenticateJWT, updateUser);
