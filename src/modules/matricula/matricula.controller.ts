import { Controller, Get, Post, Put, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { MatriculaDTO } from './matricula.dto';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';


@Controller('matricula')
export class MatriculaController {
  constructor(private readonly matriculaService: MatriculaService) {}

  @Post()
  create(@Body() data: CreateMatriculaDto) {
    return this.matriculaService.create(data);
  }

  @Get()
  findAll() {
    return this.matriculaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matriculaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateMatriculaDto) {
    return this.matriculaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matriculaService.remove(id);
  }

  //matricula/aluno/{ID_DO_ALUNO}/modulos
  @Get('modulos-aluno/alunos/:id_aluno')
  findModulosByAlunoId(@Param('id_aluno') id_aluno: string){
    return this.matriculaService.findModulosByAlunoId(id_aluno);
  }

}
