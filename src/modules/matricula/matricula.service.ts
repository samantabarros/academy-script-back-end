import { ConflictException, Injectable } from '@nestjs/common';
import { MatriculaDTO } from './matricula.dto';
import { PrismaService } from 'src/database/PrismaService';


@Injectable()
export class MatriculaService {
  constructor(private prisma: PrismaService) { }

  //Criar (create)
  async create(data) {
    const existsMatricula = await this.prisma.aluno.findFirst({
     where:{
      //Se o id_aluno já estiver associado ao id_modulo
     }
    })
    console.log(data)
    
    if(existsMatricula){
      throw new ConflictException('Esse aluno já está cadastrado nesse módulo');
    }

    const matricula = await this.prisma.matricula.create({
      data
    });

    return matricula;
  }


  //Ler (read) - para listar todos
  async findAll() {
    return this.prisma.matricula.findMany();
  }

  //Para buscar por id
  async findOne(id: string) {
    return this.prisma.matricula.findUnique(
      { where: { 
          id 
        }
      });
  }

  //Editar (update)
  async update(id: string, data: MatriculaDTO) {
    return this.prisma.matricula.update({
      where: { id },
      data,
    });
  }

  //Excluir (delete)
  async remove(id: string) {
    return this.prisma.matricula.delete({
      where: { id }
    });
  }

  // Consulta os módulos com base no id do aluno(id_aluno)
  // Busca registros na tabela Matricula que correspondem ao id do aluno e, 
  // em seguida, busca os módulos associados a esses registros
  async findModulosByAlunoId (id_aluno: string){
    return this.prisma.matricula.findMany({
      where: { id_aluno },
      include: {
        moduloId: true
      }
    });
  } 
}
