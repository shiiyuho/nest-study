/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { BatchModule } from './batch/batch.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    ProductModule,
    AuthModule,
    BatchModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
