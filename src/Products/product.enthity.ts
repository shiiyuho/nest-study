/* eslint-disable prettier/prettier */
import { Entity } from 'typeorm';

@Entity()
export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createUserId: number;
  createdAt: Date;
  updatedAt: Date;
}
