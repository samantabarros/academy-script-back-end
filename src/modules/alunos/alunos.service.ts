import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AlunoDTO } from './alunos.dto';

@Injectable()
export class AlunosService {
  constructor(private prisma: PrismaService) { }
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
      throw new ConflictException('Esse aluno já existe no sistema');

    }
    console.log(data)
    //Tratar a data_de_nascimento(o tipo)
    //const dataFormatada = data.data_nascimento;

    const aluno = await this.prisma.aluno.create({
      // data: {
      //   cpf: data.cpf,
      //   //data_nascimento: dataFormatada,
      // },
      data
    });

    return aluno;
  }

  //Mostra aluno
  async findAll() {
    return this.prisma.aluno.findMany({
      include: {
        Matricula: true
      },
      orderBy: {
        //para deixar os nomes em ordem crescente (desc) para decrescente
        nome_aluno: 'asc',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.aluno.findFirst({
      where: {
        //Procura o primeiro id que seja igual ao id que foi passado para findById
        id: id
      },
      include: {
        Matricula: {
          include:{
            moduloId: true
          }
        }

      }

    })
  }

  //Atualiza aluno
  async update(id: string, data: AlunoDTO) {
    try {
      return await this.prisma.aluno.update({
        data,
        where: {
          id,
        },
      });
    } catch (error) {
      if(error.code == 'P2002' && error.meta?.target?.includes('cpf')){
        throw new HttpException('Esse cpf já existe no sistema!', HttpStatus.BAD_REQUEST);
      }
      console.log("error");
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Deleta aluno
  async delete(id: string) {
    const alunoExists = await this.prisma.aluno.findUnique({
      where: {
        id,
      },
    });

    if (!alunoExists) {
      console.log('aluno não encontrado');
      throw new Error('Esse aluno não está cadastrado!');
    } else {
      const existsMatricula = await this.prisma.matricula.findMany({
        where: {
          id_aluno: id,
        },
      });

      if (existsMatricula) {
        await this.prisma.matricula.deleteMany({
          where: {
            id_aluno: id,
          },
        });
      }
      const res = await this.prisma.aluno.delete({
        where: {
          id,
        },
      });

      return res;
    }
  }
} //fim class AlunosService
