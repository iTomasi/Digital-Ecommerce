import {Router} from "express";
import {POST_register} from "../controllers/auth.controllers";
import userImg_multer from "../config/userImg_multer";
const router = Router();

router.post("/sign-up", userImg_multer, POST_register);


export default router;