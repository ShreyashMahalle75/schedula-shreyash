import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    const requiredRole = request.route.path.includes('doctor')
      ? 'DOCTOR'
      : 'PATIENT';

    if (user.role !== requiredRole) {
      throw new ForbiddenException(
        'Access denied for your role',
      );
    }

    return true;
  }
}