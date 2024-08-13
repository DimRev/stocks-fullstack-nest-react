import { HttpException, Injectable } from '@nestjs/common';
import { axiosInstance, STOCK_API_KEY } from 'src/lib/axios';

@Injectable()
export class StockService {
  public async getStocks() {
    try {
      const { data } = await axiosInstance.get<{ cik: string; name: string }[]>(
        'v3/cik_list' + `?apikey=${STOCK_API_KEY}`,
      );
      return data;
    } catch (err) {
      console.error(err);
      throw new HttpException('failed to get stocks', 500);
    }
  }

  async getStock(cik: string) {
    try {
      const { data } = await axiosInstance.get<{ cik: string; name: string }[]>(
        `v3/cik_list/${cik}` + `?apikey=${STOCK_API_KEY}`,
      );
      return data;
    } catch (err) {
      console.error(err);
      throw new HttpException('failed to get stock', 500);
    }
  }
}
