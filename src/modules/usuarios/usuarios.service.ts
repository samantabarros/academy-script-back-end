import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}
  //Dessa forma o service não fica refem do Prisma (desaclopa)
  async create(data: CreateUsuarioDto) {
    const usuarioExists = await this.prisma.usuario.findFirst({
      where: {
        email: data.email,
      },
    });
    if (usuarioExists) {
      throw new Error('Esse usuario ja existe no sistema');
    }
    const usuario = await this.prisma.usuario.create({
      data,
    });

    return usuario;
  }

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async update(id: string, data: UpdateUsuarioDto) {
    const usuarioExists = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!usuarioExists) {
      throw new Error('Usuario nao existe!');
    }
    return await this.prisma.usuario.update({
      data,
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
} //fim class UsuariosService
