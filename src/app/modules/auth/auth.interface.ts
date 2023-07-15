import { Document, Model, Types } from 'mongoose';
import { IBook } from '../book/book.interface';


export const ReadingStatus = {
  ToRead: 'To Read',
  CurrentlyReading: 'Currently Reading',
  FinishedReading: 'Finished Reading',
} as const;

export type ReadingStatusType = (typeof ReadingStatus)[keyof typeof ReadingStatus];


export interface IUser extends Document {
  email: string;
  password: string;
  wishlist?: (Types.ObjectId & IBook)[] | undefined;
  readingList?: Array<{
    book: Types.ObjectId | IBook;
    status: ReadingStatusType;
  }>;
}
export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type UserModel = {
  isUserExist: (
    phoneNumber: string,
  ) => Promise<Pick<IUser, 'password' | 'email' | '_id'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser, Record<string, unknown>>;
