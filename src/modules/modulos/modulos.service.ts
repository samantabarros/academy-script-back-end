import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ModuloDTO } from './modulos.dto';

@Injectable()
export class ModulosService {
  constructor(private prisma: PrismaService) {}
  //Dessa forma o service não fica refem do Prisma (desaclopa)
  async create(data: ModuloDTO) {
    // const moduloExists = await this.prisma.modulo.findFirst({
    //   where: {
    //     nome_modulo: data.nome_modulo,
    //     id_aluno: data.id_aluno,
    //   },
    // });
    //console.Console.log();

    // if (moduloExists) {
    //   throw new Error('Esse modulo ja esta cadastrado no sistema');
    // }
    const modulo = await this.prisma.modulo.create({
      data,
    });
    return modulo;
  }

  async findAll() {
    return this.prisma.modulo.findMany();
  }

  async update(id: string, data: ModuloDTO) {
    const moduloExists = await this.prisma.modulo.findUnique({
      where: {
        id,
      },
    });

    if (!moduloExists) {
      throw new Error('Esse modulo nao existe!');
    }
    return await this.prisma.modulo.update({
      data,
      where: {
        id,
      },
    });
  }

  //Exclui modulo
  async delete(id: string) {
    const moduloExists = await this.prisma.modulo.findUnique({
      where: {
        id,
      },
    });

    if (!moduloExists) {
      throw new Error('Esse modulo nao existe!');
    }
    return await this.prisma.modulo.delete({
      where: {
        id,
      },
    });
  }
} //fim class ModulosService
