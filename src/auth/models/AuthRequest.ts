import { Request } from 'express';
import { Usuario } from '../../modules/usuarios/entities/usuario.entity';
//import { AutenticaUsuarioDto } from '../dto/autentica-usuario.dto';

export interface AuthRequest extends Request {
  usuario: Usuario;
}