import {IsInt, IsNotEmpty, IsString, MaxLength} from "class-validator";


export class ImagenProductoCreateDto {
    @IsString()
    @MaxLength(200)
    @IsNotEmpty()
    url:string


    @IsNotEmpty()
    @IsInt()
    producto:string
}