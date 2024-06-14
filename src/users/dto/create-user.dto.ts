/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

//ユーザーが作成される際のDTO
export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
