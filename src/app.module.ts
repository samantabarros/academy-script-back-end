import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AlunosModule } from './modules/alunos/alunos.module';
import { ModulosModule } from './modules/modulos/modulos.module';
import { MatriculaModule } from './modules/matricula/matricula.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsuariosModule, AlunosModule, ModulosModule, MatriculaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
