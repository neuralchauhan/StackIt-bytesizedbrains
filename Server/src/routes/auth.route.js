import express from "express";
const router = express.Router();

import { verifyJWT } from "../middlewares/auth.middleware.js"
import { signup, signin, signout } from "../controllers/auth.controller.js";

router  
  .route("/signup")
  .post(signup)

router  
  .route("/signin")
  .post(signin)

router  
  .route("/signout")
  .get(verifyJWT, signout)

export default router;

