import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { IsEmail } from 'class-validator';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  //Dessa forma o service não fica refem do Prisma (desaclopa)
  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioExists = await this.prisma.usuario.findFirst({
      where: {
        email: createUsuarioDto.email,
      },
    });
    if (usuarioExists) {
      throw new Error('Esse usuario já existe no sistema');
    }

    //colocar o usuário no banco
    const data = {
      ...createUsuarioDto,
      senha: await bcrypt.hash(createUsuarioDto.senha, 10),
    };

    //Colocar o usuário no prisma (usuário no banco de dados)
    const usuarioCriado = await this.prisma.usuario.create({ data });

    return {
      ...usuarioCriado,
      senha: undefined,
    };
    //return usuario;
  }


  async findByEmail(email: string) {
    return this.prisma.usuario.findFirst({ 
      where: { 
        email
      },
     });
    
  }

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioExists = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!usuarioExists) {
      throw new Error('Usuario nao existe!');
    }
    return await this.prisma.usuario.update({
      data: updateUsuarioDto,
      where: {
        id,
      },
    });
  }

  //Deleta usuario
  async delete(id: string) {
    const usuarioExists = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!usuarioExists) {
      throw new Error('Usuario nao existe!');
    }
    return await this.prisma.usuario.delete({
      where: {
        id,
      },
    });
  }

  // async getMe() {
  //   return 'Informações de me'
  // }
  
} //fim class UsuariosService
