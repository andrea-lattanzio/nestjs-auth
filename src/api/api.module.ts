import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [],
  controllers: [AuthController],
})
export class ApiModule {}
