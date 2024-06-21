import { IsString, IsNumber } from 'class-validator';
export class CreateUsuarioDto {
    @IsNumber()
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
}
