import {IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength} from "class-validator";

export class ZoologicoCreateDto {


    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre:string


    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    familia:string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    clase:string


    @IsOptional()
    @IsString()
    @MaxLength(100)
    alimentacion:string

    @IsOptional()
    @IsNumber()
    peso:number





}