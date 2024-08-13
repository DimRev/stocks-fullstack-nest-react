import { HttpException, Injectable } from '@nestjs/common';
import { axiosInstance, STOCK_API_KEY } from 'src/lib/axios';

@Injectable()
export class StockService {
  public async getStocks() {
    try {
      const { data } = await axiosInstance.get<
        {
          symbol: string;
          name: string;
          price: number;
          exchange: string;
          exchangeShortName: string;
          type: string;
        }[]
      >('/v3/stock/list' + `?apikey=${STOCK_API_KEY}`);
      return data.slice(0, 20);
    } catch (err) {
      console.error(err);
      throw new HttpException('failed to get stocks', 500);
    }
  }

  async getStockBySymbol(symbol: string) {
    try {
      const { data } = await axiosInstance.get<
        {
          symbol: string;
          name: string;
          price: number;
          changesPercentage: number;
          dayLow: number;
          dayHigh: number;
          yearHigh: number;
          yearLow: number;
          marketCap: number;
          priceAvg50: number;
          priceAvg200: number;
          priceAvg500: number;
          peRatio: number;
          exchange: string;
          volume: number;
          avgVolume: number;
          open: number;
          previousClose: number;
          eps: number;
          pe: number;
          earningsAnnouncement: string;
          sharesOutstanding: number;
          timestamp: number;
        }[]
      >(`/v3/quote/${symbol}` + `?apikey=${STOCK_API_KEY}`);
      return data;
    } catch (err) {
      console.error(err);
      throw new HttpException('failed to get stock', 500);
    }
  }
}
