/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { BatchModule } from './batch/batch.module';
@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, ProductModule, AuthModule, BatchModule],
})
export class AppModule {}
