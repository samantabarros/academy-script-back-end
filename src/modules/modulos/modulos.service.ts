import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

@Injectable()
export class ModulosService {
  constructor(private prisma: PrismaService) {}
  //Dessa forma o service não fica refem do Prisma (desaclopa)
  async create(data: CreateModuloDto) {
    const moduloExists = await this.prisma.modulo.findFirst({
      where: {
        nome_modulo: data.nome_modulo,
      },
    });

    if (moduloExists) {
      throw new ConflictException('Esse modulo já esta cadastrado no sistema');
    }
    const modulo = await this.prisma.modulo.create({
      data,
    });
    return modulo;
  }

  async findAll() {
    return this.prisma.modulo.findMany({
      orderBy: {
        nome_modulo: 'asc',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.modulo.findFirst({
      where: {
        id: id,
      },
      include: {
        Matricula: {
          include: {
            alunoId: true,
          },
          orderBy: {
            alunoId: {
              nome_aluno: 'asc'
            }
          },
        },
      },
    });
  }

  // async findById(id: string) {
  //   const matricula = await this.prisma.modulo.findFirst({
  //     where: {
  //       id:id,
  //     },
  //     include: {
  //       Matricula: true,
  //     },
  //   });

  //   if(!matricula) {
  //     return null;
  //   }

  //   const matriculaComAluno = await this.prisma.matricula.findUnique({
  //     where: {
  //       id: matricula.Matricula.id,
  //     },
  //     include: {
  //       alunoId: {
  //         orderBy: {
  //           nome_aluno: 'asc',
  //         },
  //       },
  //     }

  //   })
  // }

  async update(id: string, data: UpdateModuloDto) {
    const moduloExists = await this.prisma.modulo.findFirst({
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
    } else {
      const existeAlunos = await this.prisma.matricula.findMany({
        where: {
          id_modulo: id,
        },
      });

      if (existeAlunos) {
        await this.prisma.matricula.deleteMany({
          where: {
            id_modulo: id,
          },
        });
      }
      const res = await this.prisma.modulo.delete({
        where: {
          id,
        },
      });
      return res;
    }
  } //fim de delete
} //fim class ModulosService
