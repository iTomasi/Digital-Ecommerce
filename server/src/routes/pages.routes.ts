import { Router } from 'express';
import {
	GET_picture,
	GET_products,
	GET_downloadProductFile,
} from '../controllers/pages.controllers';
import passport from 'passport';

const router = Router();

router.get('/img', GET_picture);
router.get(
	'/products',
	passport.authenticate('jwt', { session: false }),
	GET_products
);
router.get(
	'/download',
	passport.authenticate('jwt', { session: false }),
	GET_downloadProductFile
);

export default router;
