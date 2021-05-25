import {Router} from "express";
import {GET_picture} from "../controllers/pages.controllers";

const router = Router();

router.get("/img", GET_picture);

export default router;