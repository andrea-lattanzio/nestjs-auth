import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleGuard } from './api/guards/role.guard';
import { UserRole } from './user/user.entity';
import { Role } from './api/decorators/role.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(RoleGuard)
  @Role(UserRole.MANAGER)
  getHello(): string {
    return this.appService.getHello();
  }
}
