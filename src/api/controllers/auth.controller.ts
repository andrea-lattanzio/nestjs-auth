import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Public } from '../decorators/public.decorator';
import { LoginResponseDTO, RegisterRequestDTO } from 'src/auth/auth.dto';
import { LocalAuthGuard } from '../guards/local.guard';
import { GoogleOAuthGuard } from '../guards/google.guard';

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

  @Get('google/login')
  @UseGuards(GoogleOAuthGuard)
  async googleLogin(): Promise<void> {}

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  async handleRedirect(@Req() req, @Res() res) {
    const response = await this.authSrv.login(req.user);
    return res.redirect(
      `http://localhost:4200/dashboard?token=${response.token}&email=${response.user.email}&name=${response.user.name}&lastname=${response.user.lastname}`,
    );
  }
}
