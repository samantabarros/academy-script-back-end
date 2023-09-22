import { Module } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { ModulosController } from './modulos.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ModulosController],
  providers: [ModulosService, PrismaService],
})
export class ModulosModule {}
