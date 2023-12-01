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
import { Usuario } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  //Cria o usuario
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  //Lista o usuario
  @Get()
  async findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.usuariosService.findByEmail(email);
  }
  //Altera o usuario
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usuariosService.delete(id);
  }

  @Get('me')
  async getMe(@CurrentUser() user: Usuario) {
    // return this.usuariosService.getMe();
    return user;
  }
}
