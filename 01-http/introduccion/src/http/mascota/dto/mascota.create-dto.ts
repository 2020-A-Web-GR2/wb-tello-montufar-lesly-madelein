import {IsNotEmpty} from "class-validator";

export class MascotaCreateDto{
 @IsNotEmpty()
    nombre:string
}