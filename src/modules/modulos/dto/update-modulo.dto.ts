import { IsOptional, IsString } from "class-validator";

export class UpdateModuloDto{
    @IsOptional()
    @IsString()
    "nome_modulo"?: string
};