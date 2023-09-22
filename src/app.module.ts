import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AlunosModule } from './modules/alunos/alunos.module';
import { ModulosModule } from './modules/modulos/modulos.module';

@Module({
  imports: [UsuariosModule, AlunosModule, ModulosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
