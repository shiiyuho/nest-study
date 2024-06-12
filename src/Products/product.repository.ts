/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './productDto/create-product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async createProduct(createProductDto:CreateProductDto):Promise<Product>{
        const{name,price,createUserId}=createProductDto;
        const product=this.create({
            name,
            price,
            createUserId,
        });

        await this.save(product);
        return product;
    }
}
