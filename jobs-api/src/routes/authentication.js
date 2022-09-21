import express from "express";
import auth from "../middleware/authentication.js";
import { login, me, register } from "../controllers/authentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);

export default router;
