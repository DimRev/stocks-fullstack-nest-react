import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MONGO_DB_URI } from './lib/mongo';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [StockModule, AuthModule, MongooseModule.forRoot(MONGO_DB_URI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
