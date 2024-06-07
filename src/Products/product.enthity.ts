/* eslint-disable prettier/prettier */
import { User } from 'src/users/user.enthity';
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
  user: User;
}
