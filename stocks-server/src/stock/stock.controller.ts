import {
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  getStocks() {
    return this.stockService.getStocks();
  }

  @Get(':symbol')
  getStockBySymbol(@Param('symbol') symbol: string, @Req() request: any) {
    const token = request.cookies?.jwt;
    if (!token) {
      throw new HttpException('Unauthorized', 401);
    }
    return this.stockService.getStockBySymbol(symbol, token);
  }

  @Post('user/:symbol')
  addStockToUserPortfolio(
    @Param('symbol') symbol: string,
    @Req() request: any,
  ) {
    const token = request.cookies?.jwt;
    if (!token) {
      throw new HttpException('Unauthorized', 401);
    }
    return this.stockService.addStockToUserPortfolio(symbol, token);
  }

  @Get('user/:symbol')
  getStockDetails(@Param('symbol') symbol: string, @Req() request: any) {
    const token = request.cookies?.jwt;
    if (!token) {
      throw new HttpException('Unauthorized', 401);
    }
    return this.stockService.getStockBySymbol(symbol, token);
  }
}
