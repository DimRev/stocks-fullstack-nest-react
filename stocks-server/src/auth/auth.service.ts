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

  public async getClaimsFromToken(token: string) {
    try {
      const claims = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {
        email: string;
        username: string;
      };
      return claims;
    } catch (err) {
      throw new Error('invalid token');
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
    return {
      username: user.username,
      email: user.email,
      stockSymbols: user.stockSymbols,
      token,
    };
  }

  public async register(email: string, username: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      username,
      hashedPassword,
      stockSymbols: [],
    });
    try {
      const createdUser = await newUser.save();
      const token = this.createToken(newUser.email, newUser.username);
      return {
        username: createdUser.username,
        email: createdUser.email,
        stockSymbols: createdUser.stockSymbols,
        token,
      };
    } catch (err) {
      throw new HttpException('failed to create user', 500);
    }
  }

  public async logout() {
    return { message: 'logout successful' };
  }
}
