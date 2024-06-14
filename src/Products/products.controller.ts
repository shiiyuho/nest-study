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
import { GetUser } from 'src/auth/decorater/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async productsCreate(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    console.log(user);
    return this.productService.productsCreate(createProductDto, user);
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
    console.log(`ID を持つ製品を削除する
: ${id}`);
    return this.productService.productsDelete(id);
  }
}
