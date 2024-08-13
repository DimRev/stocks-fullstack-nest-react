import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './stock/stock.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    StockModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/stocks'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
