import {

    IsAlpha,
    IsDateString,
    IsNotEmpty,
    IsNumber, IsNumberString,
    IsOptional,
    IsPositive, Matches,
    MaxLength
} from "class-validator";



export class UsuarioCreateDto{
    @IsNotEmpty()
    @MaxLength(10)
    @MaxLength(60)
    @IsNumberString()
    cedula:string

    @IsAlpha()
    @MaxLength(60)
    @IsOptional()
    nombre?:string

    @IsAlpha()
    @MaxLength(60)
    @IsOptional()
    apellido?:string

    @IsNumber()
    @IsOptional()
    @IsPositive()
    sueldo?:string

    @IsOptional()
  //  @Matches('\d{4}(-)(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])')
    fechaNacimiento?:string

    @IsDateString()
    @IsOptional()
    fechaHoraNacimiento?:string
}