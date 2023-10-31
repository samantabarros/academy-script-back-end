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
