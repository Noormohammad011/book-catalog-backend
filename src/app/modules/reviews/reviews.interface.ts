import { Document, Model, Types } from 'mongoose';
import { IUser } from '../auth/auth.interface';


export interface IReview extends Document { 
    user: Types.ObjectId | IUser;
    comment: string;
}

export type ReviewModel = Model<IReview, Record<string, unknown>>;