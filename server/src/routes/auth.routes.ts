import {Router} from "express";
import {GET_validateUserToken, POST_register, POST_login} from "../controllers/auth.controllers";
import userImg_multer from "../config/userImg_multer";
import passport from "passport";

const router = Router();

router.get("/", passport.authenticate("jwt", {session: false}), GET_validateUserToken);
router.post("/sign-up", userImg_multer, POST_register);
router.post("/sign-in", POST_login);


export default router;