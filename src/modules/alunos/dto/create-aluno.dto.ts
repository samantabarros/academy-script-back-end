import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateAlunoDto {
    @IsString()
    @IsNotEmpty({
      message: 'Informe o nome do aluno!',
    })
    nome_aluno: string;

    @IsString()
    @IsNotEmpty({
      message: 'Informe o cpf do aluno!',

    })
    cpf: string;

    @IsString()
    @IsNotEmpty({
      message:'Informe a data de nascimento'
    })
    data_nascimento: string;
};