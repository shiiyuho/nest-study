/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.enthity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  productsCreate(
    @Body('id') id: number,
    @Body('name') name: string,
    @Body('description ') description: string,
    @Body('price') price: number,
    @Body('createUserId') createUserId: number,
    @Body('createdAt ') createdAt: Date,
    @Body('updatedAt ') updatedAt: Date,
  ): Product {
    const product: Product = {
      id,
      name,
      description,
      price,
      createUserId,
      createdAt,
      updatedAt,
    };
    return this.productService.productsCreate(product);
  }
  @Get(':id')
  productsFindById(@Param('id') id: number): Product {
    return this.productService.productsFindById(id);
  }
  @Put(':id')
  productsUpdate(@Param('id') id: number): Product {
    return this.productService.productsUpdate(id);
  }
  @Delete(':id')
  productsDelete(@Param('id') id: number): void {
    this.productService.productsDelete(id);
  }
}
