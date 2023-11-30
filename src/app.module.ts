import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AlunosModule } from './modules/alunos/alunos.module';
import { ModulosModule } from './modules/modulos/modulos.module';
import { MatriculaModule } from './modules/matricula/matricula.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [UsuariosModule, AlunosModule, ModulosModule, MatriculaModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
