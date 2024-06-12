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
import { Product } from './product.entity';
import { CreateProductDto } from './productDto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async productsCreate(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.productsCreate(createProductDto);
  }

  @Get(':id')
  async productsFindById(@Param('id') id: number): Promise<Product> {
    return this.productService.productsFindById(id);
  }

  @Put(':id')
  async productsUpdate(
    @Param('id') id: number,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ): Promise<Product> {
    return this.productService.productsUpdate(id, updateProductDto);
  }

  @Delete(':id')
  async productsDelete(@Param('id') id: number): Promise<void> {
    return this.productService.productsDelete(id);
  }
}
