import {IsAlpha, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength} from "class-validator";

export class ProductoUpdateDto{
 @IsNotEmpty()
 @IsNumber()
 id:number

 @MaxLength(20)
 @IsOptional()
 @IsString()
 codigo?:string

 @MaxLength(50)
 @IsOptional()

 nombre?:string

 @MaxLength(100)
 @IsOptional()
 @IsString()
 descripcion?:string

 @IsNumber()
 @IsOptional()
 precio?:number

 @IsInt()
 @IsOptional()
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