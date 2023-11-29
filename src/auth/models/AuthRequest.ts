import { Request } from 'express';
import { Usuario } from '../../modules/usuarios/entities/usuario.entity';

export interface AuthRequest extends Request {
  usuario: Usuario;
}