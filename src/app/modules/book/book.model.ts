import { Schema, model } from 'mongoose';
import { BookModel, Genres, IBook } from './book.interface';

export const bookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    genre: {
      type: String,
      enum: Object.values(Genres),
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    reviews: [
      {
        _id: false,
        reviewID: {
          type: Schema.Types.ObjectId,
        },
      }
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

bookSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.publicationDate instanceof Date) {
      ret.publicationDate = ret.publicationDate.toLocaleDateString('en-US');
    }
  },
});


export const Book = model<IBook, BookModel>('Book', bookSchema);
