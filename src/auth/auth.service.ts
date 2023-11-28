import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/modules/usuarios/usuarios.service';

@Injectable()
export class AuthService {
    constructor(private readonly usuariosService: UsuariosService) {}
       
    async validarUsuario(email: string, senha: string) {
        const usuario = await this.usuariosService.findByEmail('email');

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
        //Se chegar aqui seginifica que não encontrou o usuário e/ou a senha fornecida não corresponde
        throw new Error("Endereço de email ou senha informada estão incorretos!")

    }
}
