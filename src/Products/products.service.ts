/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.enthity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.enthity';
import { CreateProductDto } from './productDto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private products: Product[] = [];
  async productsCreate(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, createUserId } = createProductDto;
    const user = await this.userRepository.findOne({
      where: { id: createUserId },
    });
    if (!user) {
      throw new NotFoundException();
    }
    const product = new Product();
    product.name = name;
    product.price = price;
    product.user = user;
    product.createUserId = createUserId;

    return this.productRepository.save(product);
  }

  productsFindById(id: number): Product {
    return this.products.find((product) => product.id === id);
  }

  productsUpdate(id: number): Product {
    const product = this.productsFindById(id);
    return product;
  }

  productsDelete(id: number): void {
    this.products = this.products.filter((product) => product.id !== id);
  }
}
