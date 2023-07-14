import { Document, Model, Types } from 'mongoose';
import { IUser } from '../auth/auth.interface';
import { IReview } from '../reviews/reviews.interface';

export interface IBook extends Document {
  title: string;
  author: Types.ObjectId | IUser;
  genre: string;
  publicationDate: Date;
  reviews?: Types.ObjectId[] | IReview[];
}

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: string;
};


export type BookModel = Model<IBook, Record<string, unknown>>;