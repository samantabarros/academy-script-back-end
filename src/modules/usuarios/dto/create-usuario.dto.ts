import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUsuarioDto{
    @IsEmail()
    email: string 

    @IsString()
    @IsNotEmpty({
        message: 'Informe a senha'
    })
    senha: string
  
}