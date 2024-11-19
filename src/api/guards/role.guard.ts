import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/user/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.get<UserRole>(
      'role',
      context.getHandler(),
    );
    if (!requiredRole) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.role === requiredRole;
  }
}
