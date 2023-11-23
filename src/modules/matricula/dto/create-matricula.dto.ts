import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMatriculaDto {
    @IsString()
    id_aluno: string;
    
    @IsString()
    id_modulo: string;

    @IsOptional()
    @IsNumber()
    nota1?: number;

    @IsOptional()
    @IsNumber()
    nota2?: number;

    @IsOptional()
    @IsNumber()
    nota3?: number;
   
}
