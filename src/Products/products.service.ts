/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Product } from './product.enthity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  productsCreate(product: Product): Product {
    this.products.push(product);
    return product;
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
