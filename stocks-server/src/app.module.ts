import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './stock/stock.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StockModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
