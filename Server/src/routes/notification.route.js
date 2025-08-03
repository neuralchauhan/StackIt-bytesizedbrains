import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { getNotification } from "../controllers/notification.controller.js"
 
const router = Router()

router
  .route('/')
  .get(verifyJWT, getNotification)

export default router