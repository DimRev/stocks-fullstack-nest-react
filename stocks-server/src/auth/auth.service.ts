import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}
  public async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new HttpException('invalid email or password', 401);
    }

    return { username: user.username, email: user.email };
  }

  public async register(email: string, username: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, username, hashedPassword });
    await newUser.save();

    return { username: newUser.username, email: newUser.email };
  }

  public async logout() {
    return { message: 'logout successful' };
  }
}
