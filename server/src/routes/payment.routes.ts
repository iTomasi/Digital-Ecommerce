import { Router } from 'express';
import { POST_product } from '../controllers/payment.controllers';
import passport from 'passport';

const router = Router();

router.post(
	'/purchase-products',
	passport.authenticate('jwt', { session: false }),
	POST_product
);

export default router;
