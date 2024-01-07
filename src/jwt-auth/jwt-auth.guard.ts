import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthService } from './jwt-auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
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
    const { headers } = context.switchToHttp().getRequest();

    const userPayload = this.jwtAuthService.verifyJwt(token);
    if (userPayload) {
      headers.id = userPayload.id;
      headers.firstName = userPayload.firstName;
      headers.lastName = userPayload.lastName;
      headers.username = userPayload.username;

      return true;
    }
    return false;
  }
}
