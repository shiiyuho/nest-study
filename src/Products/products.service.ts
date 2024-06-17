/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './productDto/create-product.dto';
import { User } from '../users/user.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async productsCreate(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    return this.productRepository.createProduct(createProductDto, user);
  }

  async productsFindById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id, {
      relations: ['user'],
    });
    if (!product) {
      throw new NotFoundException('商品が見つかりません');
    }
    return product;
  }

  async productsUpdate(
    id: number,
    updateProductDto: Partial<CreateProductDto>,
  ): Promise<Product> {
    const product = await this.productsFindById(id);
    if (!product) {
      throw new NotFoundException('商品が見つかりませんよーーーーー');
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async productsDelete(id: number): Promise<void> {
    const product = await this.productsFindById(id);
    if (!product) {
      throw new NotFoundException('商品が見つかりませんねーーーーーーー');
    }
    console.log(`製品の削除: ${product}`);
    await this.productRepository.remove(product);
    console.log(`ID を持つ製品が削除されました: ${id}`);
  }
}
