import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/modules/usuarios/usuarios.service';

@Injectable()
export class AuthService {
    
    constructor(private usuariosService: UsuariosService) {}

    login(usuario: Usuario) {
        throw new Error('Method not implemented.');
    }
       
    async validarUsuario(email: string, senha: string) {
        console.log("Entrou em validar usuário");
        const usuario = await this.usuariosService.findByEmail(email);
        console.log(usuario);

        if(usuario){
            //Checa se a senha informada é igual a hash que está no banco
            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            if(senhaValida){
                return {
                    ...usuario,
                    senha: undefined,
                };
            }
        }
        //Se chegar aqui significa que não encontrou o usuário e/ou a senha fornecida não corresponde
        throw new Error('Endereço de email ou senha informada estão incorretos!')
    }
}
