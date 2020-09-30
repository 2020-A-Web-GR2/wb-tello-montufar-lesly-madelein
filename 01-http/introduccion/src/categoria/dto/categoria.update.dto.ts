import {IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";

export class CategoriaUpdateDto{
    @IsNotEmpty()
    @IsNumber()
    id:number

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre:string

}