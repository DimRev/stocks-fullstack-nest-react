import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { IUser } from 'src/auth/interface/user.interface';
import { axiosInstance, STOCK_API_KEY } from 'src/lib/axios';
import { IStocks } from './interface/stocks.interface';

@Injectable()
export class StockService {
  constructor(
    private readonly authService: AuthService,
    @InjectModel('User') private readonly userModel: Model<IUser>,
    @InjectModel('Stocks') private readonly stockModel: Model<IStocks>,
  ) {}
  public async getStocks() {
    try {
      const stocks = await this.stockModel.findOne({
        timestamp: { $gt: Date.now() - 1000 * 60 * 10 },
      });
      if (stocks) {
        console.log('hit cache');
        return stocks.stocks.slice(0, 20);
      }
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
      const newStocks = {
        stocks: data.slice(0, 20),
        timestamp: Date.now(),
      };
      await this.stockModel.create(newStocks);
      console.log('update cache');
      return newStocks.stocks.slice(0, 20);
    } catch (err) {
      console.error(err);
      if (err instanceof HttpException) throw err;
      throw new HttpException('failed to get stocks', 500);
    }
  }

  public async getStockBySymbol(symbol: string, token: string) {
    // PROTECTED ROUTE - check if user is authenticated
    await this.authService.getClaimsFromToken(token);
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
      return data[0];
    } catch (err) {
      console.error(err);
      if (err instanceof HttpException) throw err;
      throw new HttpException('failed to get stock', 500);
    }
  }

  public async addStockToUserPortfolio(symbol: string, token: string) {
    // PROTECTED ROUTE - check if user is authenticated
    const { email } = await this.authService.getClaimsFromToken(token);
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new HttpException('user not found', 404);
      }
      if (user.stockSymbols.includes(symbol)) {
        throw new HttpException('stock already added', 400);
      }
      user.stockSymbols.push(symbol);
      if (!user.stockSymbols.length) {
        throw new HttpException('no stocks added', 400);
      }
      await user.save();
      return { stockSymbols: user.stockSymbols };
    } catch (err) {
      console.error(err);
      if (err instanceof HttpException) throw err;
      throw new HttpException('failed to add stock to user portfolio', 500);
    }
  }
}
