import {IS_DATE, IsAlpha, IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, MaxLength} from "class-validator";



export class UsuarioCreateDto{
    @IsNotEmpty()
    @MaxLength(10)
    @MaxLength(60)
    @IsAlpha()
    cedula:string

    @IsAlpha()
    @MaxLength(60)
    @IsOptional()
    @IsAlpha()
    apellido?:string

    @IsNumber()
    @IsOptional()
    @IsPositive()
    sueldo?:string

    @IsDate()
    fechaNacimiento?:string

    @IsDate()
    fechaHoraNacimiento?:string
}