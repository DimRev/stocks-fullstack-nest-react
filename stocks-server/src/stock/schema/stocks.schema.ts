import { Schema } from 'mongoose';
import { IStocks } from '../interface/stocks.interface';

export const StockSchema = new Schema<IStocks>({
  stocks: [
    {
      symbol: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      exchange: { type: String, required: true },
      exchangeShortName: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
  timestamp: { type: Number, required: true },
});
