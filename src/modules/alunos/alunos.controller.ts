import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { AlunoDTO } from './alunos.dto';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}
  //Cadastra o aluno
  @Post()
  async create(@Body() data: AlunoDTO) {
    console.log(data);
    return this.alunosService.create(data);
  }

  //Lista os alunos
  @Get()
  async findAll() {
    return this.alunosService.findAll();
  }

  
  @Get(':id')
  async findById() {
    return this.alunosService.findById('id');
  }

  //Edita os dados de um aluno
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: AlunoDTO) {
    return this.alunosService.update(id, data);
  }
  //Deleta um dado
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.alunosService.delete(id);
  }
} //fim da class AlunosService
