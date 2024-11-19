import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [AuthModule],
  providers: [JwtStrategy, { provide: APP_GUARD, useClass: JwtGuard }],
  controllers: [AuthController],
})
export class ApiModule {}
