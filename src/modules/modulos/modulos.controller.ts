import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}
  //Cadastra o modulo
  @Post()
  async create(@Body() data: CreateModuloDto) {
    return this.modulosService.create(data);
  }

  //Mostra os modulos
  @Get()
  async findAll() {
    return this.modulosService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Query('pagina') pagina: number,
    @Query('itensPorPagina') itensPorPagina: number,
    @Query('busca') busca?: string,
  ) {
    console.log(id, pagina, itensPorPagina, busca);
  
    return this.modulosService.findById(id, pagina, itensPorPagina, busca);
  }

  //Edita um modulo
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateModuloDto) {
    return this.modulosService.update(id, data);
  }
  //Deleta um modulo
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.modulosService.delete(id);
  }
} //fim da class ModulosService
