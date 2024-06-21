import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsNumber()
    @IsNotEmpty()
    autor: string;

    @IsNumber()
    @IsNotEmpty()
    isbn: number;
}