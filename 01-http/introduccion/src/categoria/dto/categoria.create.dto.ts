import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CategoriaCreateDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre:string

}