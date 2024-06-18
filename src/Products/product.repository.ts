/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './productDto/create-product.dto';
import { User } from '../users/user.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const { name, price, description } = createProductDto;
    const product = this.create({
      name,
      price,
      description,
      user,
    });

    await this.save(product);
    return product;
  }
}
