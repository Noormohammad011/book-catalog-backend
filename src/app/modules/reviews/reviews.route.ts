import express from 'express';
import auth from '../../middlewares/auth';
import { ReviewController } from './reviews.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidator } from './reviews.validation';


const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(ReviewValidator.createReviewZodSchema),
  ReviewController.createReview,
);

export const ReviewRoute = router;
