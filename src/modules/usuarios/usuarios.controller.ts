import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  //Cria o usuario
  @Post()
  async create(@Body() data: CreateUsuarioDto) {
    return this.usuariosService.create(data);
  }

  //Lista o usuario
  @Get()
  async findAll() {
    return this.usuariosService.findAll();
  }

  //Altera o usuario
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUsuarioDto) {
    return this.usuariosService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usuariosService.delete(id);
  }
}
