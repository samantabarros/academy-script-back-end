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
  
    handleRequest(err) {
      //Fazer a lógica do validate
      //Aqui eu devo buscar pelo usuario
      
      if (err || !usuario) {
        console.log(err);
        throw new UnauthorizedException("Erro ao executar login!");
      }
  
      return usuario;
    }
  }