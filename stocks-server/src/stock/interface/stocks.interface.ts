import { Document } from 'mongoose';

export interface IStocks extends Document {
  stocks: {
    symbol: string;
    name: string;
    price: number;
    exchange: string;
    exchangeShortName: string;
    type: string;
  }[];
  timestamp: number;
}
