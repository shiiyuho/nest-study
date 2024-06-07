/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsService],
})
export class ProductModule {
  id: number;
  name: string;
  description: string;
  price: number;
  createUserId: number;
  createdAt: Date;
  updatedAt: Date;
}
