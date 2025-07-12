import express from "express";
const router = express.Router();
import { signup } from "../controllers/authController.js";
import { signin } from "../controllers/authController.js";
import { signout } from "../controllers/authController.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

export default router;

