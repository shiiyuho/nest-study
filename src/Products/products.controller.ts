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
import { CreateProductDto } from './productDto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  productsCreate(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.productsCreate(createProductDto);
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
