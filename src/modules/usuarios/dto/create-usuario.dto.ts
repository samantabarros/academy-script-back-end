import { IsNotEmpty, IsString } from "class-validator"

export class CreateUsuarioDto{
    @IsString()
    @IsNotEmpty({
        message: 'Informe o email'
    })
    "email": string 

    @IsString()
    @IsNotEmpty({
        message: 'Informe a senha'
    })
    "senha": string
  
}