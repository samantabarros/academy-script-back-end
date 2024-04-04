import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MatriculaService } from './matricula.service';
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
  findAll(
    @Query('pagina') pagina: number,
    @Query('itensPorPagina') itensPorPagina: number,
    @Query('busca') busca?: string,
  ) {
    return this.matriculaService.findAll(pagina, itensPorPagina, busca);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Query('pagina') pagina: number,
    @Query('itensPorPagina') itensPorPagina: number,
    @Query('busca') busca?: string,
  ) {
    return this.matriculaService.findById(id,pagina, itensPorPagina, busca);
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
  findModulosByAlunoId(@Param('id_aluno') id_aluno: string) {
    return this.matriculaService.findModulosByAlunoId(id_aluno);
  }

  //matricula/modulos/{ID_DO_MODULO}/alunos
  @Get('alunos-modulo/modulos/:id_modulo')
  findAlunosByModuloId(@Param('id_modulo') id_modulo: string) {
    return this.matriculaService.findAlunosByModuloId(id_modulo);
  }
}
