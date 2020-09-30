import {IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";

export class ImagenProductoUpdateDto {
    @IsNotEmpty()
    @IsNumber()
    id:number

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    url:string
}