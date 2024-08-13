import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body, @Res() res) {
    const { email, password } = body;
    const result = await this.authService.login(email, password);
    res.cookie('jwt', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });
    res.send({
      username: result.username,
      email: result.email,
      stockSymbols: result.stockSymbols,
    });
  }

  @Post('register')
  async register(@Body() body, @Res() res) {
    const { email, username, password } = body;
    const result = await this.authService.register(email, username, password);
    res.cookie('jwt', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });
    res.send({
      username: result.username,
      email: result.email,
      stockSymbols: result.stockSymbols,
    });
  }

  @Post('logout')
  async logout(@Res() res) {
    const result = await this.authService.logout();
    res.clearCookie('jwt');
    res.send(result);
  }
}
