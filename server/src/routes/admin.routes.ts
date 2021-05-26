import { Router } from 'express';
import passport from 'passport';
import { POST_addProduct } from '../controllers/admin.controllers';
import productFile_multer from '../config/productFile_multer';

const router = Router();

router.post(
	'/add-product',
	passport.authenticate('jwt_admin', { session: false }),
	productFile_multer,
	POST_addProduct
);

export default router;
