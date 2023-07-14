import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

export const bookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    //   {
    //     _id: false,
    //   },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Book = model<IBook, BookModel>('Book', bookSchema);
