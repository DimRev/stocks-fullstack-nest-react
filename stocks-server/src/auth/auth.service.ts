import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'src/lib/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  private createToken(email: string, username: string): string {
    const payload = { email, username };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  }

  public async getUserFromToken(token: string) {
    try {
      const claims = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {
        email: string;
        username: string;
      };
      const user = await this.userModel.findOne({ email: claims.email });
      if (!user) {
        throw new Error('invalid token');
      }
      return user;
    } catch (err) {
      return new Error('invalid token');
    }
  }

  public async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new HttpException('invalid email or password', 401);
    }

    const token = this.createToken(user.email, user.username);
    return { username: user.username, email: user.email, token };
  }

  public async register(email: string, username: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, username, hashedPassword });
    await newUser.save();

    const token = this.createToken(newUser.email, newUser.username);
    return { username: newUser.username, email: newUser.email, token };
  }

  public async logout() {
    return { message: 'logout successful' };
  }
}
