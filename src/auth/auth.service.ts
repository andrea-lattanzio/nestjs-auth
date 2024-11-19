import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthProvider, IUser } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginResponseDTO, RegisterRequestDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userSrv: UserService,
    private jwtSrv: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser> {
    const user: IUser = await this.userSrv.findOneByEmail(email);
    if (!user) throw new BadRequestException();
    if (user.authProvider === AuthProvider.GOOGLE)
      throw new BadRequestException('Login with google');

    const match: boolean = bcrypt.compareSync(password, user.password);
    if (!match) throw new BadRequestException();
    return user;
  }

  async login(validatedUser: IUser): Promise<LoginResponseDTO> {
    const payload: Partial<IUser> = {
      id: validatedUser.id,
      role: validatedUser.role,
      email: validatedUser.email,
    };
    const user: Partial<IUser> = {
      name: validatedUser.name,
      lastname: validatedUser.lastname,
      email: validatedUser.email,
      role: validatedUser.role,
    };

    return { token: this.jwtSrv.sign(payload), user: user };
  }

  async register(user: RegisterRequestDTO): Promise<LoginResponseDTO> {
    const existingUser = await this.userSrv.findOneByEmail(user.email);
    if (existingUser) throw new BadRequestException('email already in use');

    const hashedPassword = await bcrypt.hash(user.password, 5);
    const newUser: IUser = {
      ...user,
      authProvider: AuthProvider.LOCAL,
      password: hashedPassword
    }
    await this.userSrv.create(newUser);
    return this.login(newUser);
  }
}
