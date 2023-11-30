import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/modules/usuarios/usuarios.service';
import { UsuarioPayload } from './models/UsuarioPayload';
import { JwtService } from '@nestjs/jwt';
import { UsuarioToken } from './models/UsuarioToken';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuariosService: UsuariosService) {}

  async login(usuario: Usuario): Promise <UsuarioToken> {
    //Transforma o usuario em JWT
    //console.log("Usuário:" + usuario);
    const payload: UsuarioPayload = {
        sub: usuario.id,
        email: usuario.email
    };
    //console.log(payload);

    const jwtToken = this.jwtService.sign(payload);
    return {
        acess_token: jwtToken, 
    }

  }

  async validarUsuario(email: string, password: string): Promise<Usuario>{
    //console.log('Entrou em validar usuário');
    const usuario = await this.usuariosService.findByEmail(email);
    //console.log(usuario);

    if (usuario) {
      //Checa se a senha informada é igual a hash que está no banco
      const senhaValida = await bcrypt.compare(password, usuario.senha);

      if (senhaValida) {
        return {
          ...usuario,
          password: undefined,
        };
      }
    }
    //Se chegar aqui significa que não encontrou o usuário e/ou a senha fornecida não corresponde
    throw new Error('Endereço de email ou senha informada estão incorretos!');
  }
}
