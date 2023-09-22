import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { ModuloDTO } from './modulos.dto';
@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}
  //Cadastra o modulo
  @Post()
  async create(@Body() data: ModuloDTO) {
    return this.modulosService.create(data);
  }

  //Mostra os modulos
  @Get()
  async findAll() {
    return this.modulosService.findAll();
  }

  //Edita um modulo
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ModuloDTO) {
    return this.modulosService.update(id, data);
  }
  //Deleta um modulo
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.modulosService.delete(id);
  }
} //fim da class ModulosService
