import { Router } from 'express';
import * as ReviewsController from '../controllers/reviews.controller';

const router = new Router();

router.route('/profesor/:slug/review').post(ReviewsController.createReview);

export default router;
