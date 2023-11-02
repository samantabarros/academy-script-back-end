import { ConflictException, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';


@Injectable()
export class MatriculaService {
  constructor(private prisma: PrismaService) { }

  //Criar (create)
  async create(data) {
    // const existsMatricula = await this.prisma.matricula.findFirst({
    //  where:{
    //   id_aluno: data.id_aluno, id_modulo: data.id_modulo
    //  }
    // })
    // console.log(data)
    
    // if(existsMatricula){
    //   throw new HttpException('Esse aluno já está cadastrado nesse módulo!', HttpStatus.BAD_REQUEST);
    // }

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
  async update(id: string, data: UpdateMatriculaDto) {
    console.log(id);
    console.log(data);
    //Alterar essa lógica depois (enviar o id da matricula em vez do id do aluno)
    const matricula = await this.prisma.matricula.findFirst({
      where:{
        id_aluno:data.id_aluno, id_modulo:data.id_modulo
      }
  });
    return this.prisma.matricula.update({
      where: { id: matricula.id },
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
