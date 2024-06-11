/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User])],
  providers: [ProductsService],
  controllers: [ProductsController],
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
