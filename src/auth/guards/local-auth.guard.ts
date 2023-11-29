import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, usuario) {
    console.log("Entrou em Handle Request")
    console.log(err)
    console.log(usuario)
    if (err || !usuario) {
      throw new UnauthorizedException(err?.message);
    }

    return usuario;
  }
}