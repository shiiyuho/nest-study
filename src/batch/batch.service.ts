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

  @Cron('*/5 * * * *') //5分おきにストック補充
  async updateProductStock() {
    const updateData: QueryDeepPartialEntity<Product> = { stock: 10 };
    await this.productRepository.update({}, updateData);
    console.log('在庫を10に更新しました');
  }
}
