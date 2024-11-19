import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserInfoDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;
}