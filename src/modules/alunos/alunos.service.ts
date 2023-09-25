import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AlunoDTO } from './alunos.dto';

@Injectable()
export class AlunosService {
  constructor(private prisma: PrismaService) {}
  //Dessa forma o service não fica refem do Prisma (desaclopa)
  async create(data: AlunoDTO) {
    //Cria um aluno
    const alunoExists = await this.prisma.aluno.findFirst({
      where: {
        cpf: data.cpf,
      },
    });
    // console.log(data);
    // console.log(alunoExists);
    if (alunoExists) {
      throw new Error('Esse aluno ja existe no sistema');
    }
    const aluno = await this.prisma.aluno.create({
      data,
    });

    return aluno;
  }

  //Mostra aluno
  async findAll() {
    return this.prisma.aluno.findMany({
      include: {
        Matricula: true,
      },
      orderBy: {
        //para deixar os nomes em ordem crescente (desc) para decrescente
        nome_aluno: 'asc',
      },
    });
  }
  //Atualiza aluno
  async update(id: string, data: AlunoDTO) {
    const alunoExists = await this.prisma.aluno.findUnique({
      where: {
        id,
      },
    });

    if (!alunoExists) {
      throw new Error('Esse aluno nao esta cadastrado!');
    }
    return await this.prisma.aluno.update({
      data,
      where: {
        id,
      },
    });
  }

  //Deleta aluno
  async delete(id: string) {
    //const deleteMatricula = await this.prisma
    const alunoExists = await this.prisma.aluno.findUnique({
      where: {
        id,
      },
    });

    if (!alunoExists) {
      console.log('aluno não encontrado');
      throw new Error('Esse aluno nao esta cadastrado!');
    } else {
      const res = await this.prisma.aluno.delete({
        where: {
          id,
        },
      });

      return res;
    }
  }
} //fim class AlunosService
