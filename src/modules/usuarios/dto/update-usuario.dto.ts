import { IsOptional, IsString } from "class-validator"

export class UpdateUsuarioDto{
    @IsOptional()
    @IsString()
    "email"?: string
    
    @IsOptional()
    @IsString()
    "senha"?: string
}