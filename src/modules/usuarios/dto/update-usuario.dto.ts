import { IsEmail, IsOptional, IsString } from "class-validator"

export class UpdateUsuarioDto{
    @IsOptional()
    @IsEmail()
    email?: string
    
    @IsOptional()
    @IsString()
    senha?: string
}