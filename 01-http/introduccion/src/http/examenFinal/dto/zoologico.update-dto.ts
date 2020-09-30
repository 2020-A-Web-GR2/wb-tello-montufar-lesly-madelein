import {IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength} from "class-validator";

export class ZoologicoUpdateDto {

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