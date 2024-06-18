import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BatchService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @Cron('*/5 * * * *') //5分おきにストック補充（スケジューリングライブラリ）
  async updateProductStock() {
    const startTime = new Date(); //開始時間の取得
    console.log(`バッチ処理の開始時間は、${startTime.toISOString()}`);

    try {
      //更新処理
      const updateData: QueryDeepPartialEntity<Product> = { stock: 10 };
      const result = await this.productRepository.update({}, updateData);
      console.log('在庫を10に更新しました');

      //処理件数の表示
      const affectedRows = result.affected || 0;
      console.log(`処理件数は、${affectedRows}`);

      const endTime = new Date(); //終了時間の取得
      console.log(`バッチ処理の終了時間は、${endTime.toISOString()}`);

      //エラー処理
    } catch (error) {
      const errorTime = new Date();
      console.error(`バッチ処理中にエラーが発生しました。${error.message}`);
      console.error(`エラー発生の時間は、${errorTime.toISOString()}`);
    }
  }
}
