//create review service when creating review complete then it push to the Book model where reviews array is there and referencing to the review model

import httpStatus from 'http-status';
import { startSession } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { User } from '../auth/auth.model';
import { Book } from '../book/book.model';
import { IReview } from './reviews.interface';
import { Review } from './reviews.model';

const createReview = async (
  userId: string,
  bookId: string,
  reviewComment: string,
): Promise<IReview> => {
  const session = await startSession();

  try {
    session.startTransaction();
    const isExist = await User.findOne({ _id: userId });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    }
    const book = await Book.findById(bookId).session(session);
    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found!');
    }

    const reviewData: Partial<IReview> = {
      user: isExist?._id,
      book: book?._id,
      comment: reviewComment,
    };

   
    const review = await Review.create([reviewData], { session });

    
    if (!book.reviews) {
      book.reviews = [];
    }

    book.reviews.push(review[0]._id);

    await book.save({ session });

    await session.commitTransaction();

    return review[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


export const ReviewService = {
    createReview,
}