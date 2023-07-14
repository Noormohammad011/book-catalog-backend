import { Document, Model } from 'mongoose';


export interface IUser extends Document {
  email: string;
  password: string;
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
