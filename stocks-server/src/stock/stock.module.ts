import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/schema/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { StockSchema } from './schema/stocks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Stocks', schema: StockSchema }]),
    AuthModule,
  ],
  providers: [StockService],
  controllers: [StockController],
})
export class StockModule {}
