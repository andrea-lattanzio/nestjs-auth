import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { Public } from "../decorators/public.decorator";
import { LoginResponseDTO, RegisterRequestDTO } from "src/auth/auth.dto";
import { LocalAuthGuard } from "../guards/local.guard";

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authSrv: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<LoginResponseDTO> {
    return this.authSrv.login(req.user);
  }

  @Post('register')
  async register(
    @Body() registerBody: RegisterRequestDTO,
  ): Promise<LoginResponseDTO> {
    return await this.authSrv.register(registerBody);
  }
}