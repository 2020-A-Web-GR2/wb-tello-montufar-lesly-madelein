import {IsAlpha, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength} from "class-validator";

export class ProductoCreateDto{
    @MaxLength(20)
    @IsString()
    codigo?:string


    @MaxLength(50)
    @IsNotEmpty()
    nombre:string


    @MaxLength(100)
    @IsOptional()
    @IsString()
    descripcion?:string


    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    precio:number

    @IsInt()
    @IsPositive()
    cantidad?:number

    @IsString()
    @IsOptional()
    fechaInicio?:string


    @IsString()
    @IsOptional()
    fechaFin?:string



    @IsOptional()
    @IsInt()
    categoria?:number




}