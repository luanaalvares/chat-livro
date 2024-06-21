import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateBookDto {

    @IsString()
    id: string;

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