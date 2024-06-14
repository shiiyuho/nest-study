/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './productDto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async productsUpdate(
    @Param('id') id: number,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ): Promise<Product> {
    return this.productService.productsUpdate(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async productsDelete(@Param('id') id: number): Promise<void> {
    return this.productService.productsDelete(id);
  }
}
