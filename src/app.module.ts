/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './Products/products.module';
@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, ProductModule],
})
export class AppModule {}
