import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import paginate from 'src/assets/paginate';

@Injectable()
export class AlunosService {
  constructor(private prisma: PrismaService) {}
  //Dessa forma o service não fica refem do Prisma (desaclopa)
  async create(data: CreateAlunoDto) {
    //Cria um aluno
    const alunoExists = await this.prisma.aluno.findFirst({
      where: {
        cpf: data.cpf,
      },
    });
    if (alunoExists) {
      throw new ConflictException('Esse aluno já existe no sistema');
    }
    
    const aluno = await this.prisma.aluno.create({
      data,
    });

    return aluno;
  }

  //Mostra aluno
  async findAll(pagina: number, itensPorPagina: number, busca?: string) {
    return paginate({
      module: 'aluno',
      busca,
      pagina,
      itensPorPagina,
      buscaPor: {
        nome_aluno: {
          contains: busca,
          mode: 'insensitive',
        },
      },
      ordenacao: {
        nome_aluno: 'asc',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.aluno.findFirst({
      where: {
        //Procura o primeiro id que seja igual ao id que foi passado para findById
        id: id,
      },
      orderBy: {
        //módulos em ordem alfabética
      },
      include: {
        Matricula: {
          include: {
            moduloId: true,
          },
          orderBy: {
            moduloId: {
              nome_modulo: 'asc',
            },
          },
        },
      },
    });
  }

  //Atualiza aluno
  async update(id: string, data: UpdateAlunoDto) {
    try {
      return await this.prisma.aluno.update({
        data,
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code == 'P2002' && error.meta?.target?.includes('cpf')) {
        throw new HttpException(
          'Esse cpf já existe no sistema!',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log('error');
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
