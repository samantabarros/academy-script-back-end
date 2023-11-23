import { IsNotEmpty, IsString } from "class-validator";

export class CreateModuloDto {
    @IsString()
    @IsNotEmpty({
        message: 'Informe o nome do módulo'
    })
    nome_modulo: string
};