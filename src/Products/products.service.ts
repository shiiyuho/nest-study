/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './productDto/create-product.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly usersService: UsersService,
  ) {}

  private products: Product[] = [];
  async productsCreate(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, createUserId } = createProductDto;
    console.log('Product作成時のユーザーID:', createUserId); // デバッグ用ログ

    console.log(createProductDto);

    const user = await this.usersService.findById(createUserId);
    console.log(user);

    if (!user) {
      throw new NotFoundException('ユーザーが見つかりませんですはい');
    }

    const product = new Product();
    product.name = name;
    product.price = price;
    product.user = user;
    // product.createUserId = createUserId;

    return this.productRepository.save(product);
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

    await this.productRepository.remove(product);
  }
}
