import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { UserController } from './controllers/user.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  providers: [JwtStrategy, { provide: APP_GUARD, useClass: JwtGuard }],
  controllers: [AuthController, UserController],
})
export class ApiModule {}
