import { Schema } from 'mongoose';
import { IUser } from '../interface/user.interface';

export const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  stockSymbols: [String],
});
