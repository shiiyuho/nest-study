/* eslint-disable prettier/prettier */
import { Product } from '../products/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @Column({ nullable: false, unique: true })
  userName: string;
  @Column({ nullable: false, default: 'user' })
  role: string;
  @Column({ nullable: true })
  lastLoginAt: string;
}
