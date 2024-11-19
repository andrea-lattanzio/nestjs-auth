import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { IUser } from '../user/user.entity';

export class LoginRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty()
  password: string;
}
export interface LoginResponseDTO {
  token: string;
  user: Partial<IUser>;
}

export class RegisterRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString({ message: 'Password must be a string' })
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain at least one number and one special character',
  })
  password: string;
}
