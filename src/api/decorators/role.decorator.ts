import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/user.entity';

export const Role = (role: UserRole) => SetMetadata('role', role);
