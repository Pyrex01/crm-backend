import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';

@Injectable()
export class JwtApiGuard implements CanActivate {
  constructor(private jwtAuthService: JwtAuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { authorization } = context.switchToHttp().getRequest().headers;
    if (!authorization) {
      return false;
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer != 'bearer') {
      return false;
    }
    const userPayload = this.jwtAuthService.verifyJwt(token);
    if (userPayload) {
      return true;
    }
    return false;
  }
}
