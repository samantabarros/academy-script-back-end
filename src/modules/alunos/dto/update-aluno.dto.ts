import { IsOptional, IsString } from "class-validator";

export class UpdateAlunoDto {
    @IsString()
    @IsOptional()
    nome_aluno?: string;

    @IsString()
    @IsOptional()
    cpf?: string;

    @IsString()
    @IsOptional()
    data_nascimento?: string;
}
