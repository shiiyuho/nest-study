import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [BatchService],
})
export class BatchModule {}
