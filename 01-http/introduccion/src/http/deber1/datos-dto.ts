import {IsNotEmpty, IsNumber} from "class-validator";


export class DatosDto{
    @IsNumber()
    @IsNotEmpty()
    valor1:number

    @IsNumber()
    @IsNotEmpty()
    valor2:number
}