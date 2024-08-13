import { Injectable } from '@nestjs/common';
import { axiosInstance, STOCK_API_KEY } from 'src/lib/axios';

@Injectable()
export class StockService {
  getStocks() {
    axiosInstance.get<{ cik: string; name: string }[]>(
      'v3/cik_list' + `?apikey=${STOCK_API_KEY}`,
    );
  }
}
