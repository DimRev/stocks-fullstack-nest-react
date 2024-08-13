import { Controller, Get, Param } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  getStocks() {
    return this.stockService.getStocks();
  }

  @Get(':symbol')
  getStockBySymbol(@Param('symbol') symbol: string) {
    return this.stockService.getStockBySymbol(symbol);
  }
}
