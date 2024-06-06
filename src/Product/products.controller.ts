/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post()
  create() {
    return 'this is create';
  }
  @Get()
  findById() {
    return 'This is findById';
  }
  @Put()
  update() {
    return 'This is update';
  }
  @Delete()
  delete() {
    return 'This is delete';
  }
}
