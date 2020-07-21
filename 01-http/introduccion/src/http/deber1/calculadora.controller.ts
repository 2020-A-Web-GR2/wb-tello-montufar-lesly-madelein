import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Headers,
    HttpCode,
    Param,
    Post,
    Put,
    Query, Req, Res
} from "@nestjs/common";
import {DatosDto} from "./datos-dto";
import {Validate, validate, ValidationError} from "class-validator";

@Controller('calculadora')

export class CalculadoraController{
    @Get('suma/:n2')
    @HttpCode(200)
    async sumar(
        @Query() parametroConsultan1,
        @Param() parametroRutan2,
        @Req() req
    ){

        if(this.verificarUsuario(req)){
            const datosCliente=new DatosDto()
            datosCliente.valor1= Number(parametroConsultan1.n1)
            datosCliente.valor2=Number(parametroRutan2.n2)
            try{
                console.log(parametroConsultan1.n1+'  Param ruta:'+parametroRutan2.n2)
                const errores:ValidationError[]=await validate(datosCliente)
                if(errores.length>0){
                    console.error('Errores',errores)
                    throw new BadRequestException("Los datos ingresados no son correctos")

                }else{
                    return datosCliente.valor1+datosCliente.valor2

                }
            }catch(e){

                throw new BadRequestException("Error al usar class validator");
            }
        }else{
            return 'Debe registrar primeramente a un usuario'
        }


    }


    @Put('resta')
    @HttpCode(201)
    async restar(
        @Body() parametroCuerpo,
        @Req() req
    ){

        if(this.verificarUsuario(req)){
            const datosCliente= new DatosDto()
            datosCliente.valor1=parametroCuerpo.n1
            datosCliente.valor2=parametroCuerpo.n2
            try{
                const errores:ValidationError[]=await validate(datosCliente)
                if(errores.length>0){
                    console.error('Errores',errores)
                    throw new BadRequestException("Los datos ingresados no son correctos")
                }else{

                    return datosCliente.valor1-datosCliente.valor2

                }
            }catch (e){
                throw new BadRequestException("Error con class-validator")
            }
        }else{
            return 'Debe registrar primeramente a un usuario'
        }



    }

    @Delete('multiplicacion')
    @HttpCode(200)
    async multiplicar(
        @Headers() datos,
        @Req() req
    ){


        if(this.verificarUsuario(req)){
            const datosCliente=new DatosDto()
            datosCliente.valor1=Number(datos.n1)
            datosCliente.valor2=Number(datos.n2)
            try{
                const errores:ValidationError[]=await validate(datosCliente)
                if(errores.length>0){
                    console.error('Errores encontrados',errores)
                    throw new BadRequestException("Los datos ingresados no son correctos")
                }else{

                    return datosCliente.valor1*datosCliente.valor2

                }
            }catch (e){
                throw new BadRequestException("Error con class-validator")
            }

        }else{
            return 'Debe registrar primeramente a un usuario'
        }



    }

    @Post('division/:n1/div/:n2')
    @HttpCode(201)
    async dividir(
        @Param() parametrosRuta,
         @Req() req

    ){
        const bandera=this.verificarUsuario(req)
        if(bandera){
            const datosCliente=new DatosDto()
            datosCliente.valor1=Number(parametrosRuta.n1)
            datosCliente.valor2=Number(parametrosRuta.n2)
            try{
                const errores:ValidationError[]=await validate(datosCliente)
                if(errores.length>0){
                    console.error('Errores encontrados',errores)
                    throw new BadRequestException("Los datos ingresados no son correctos")

                }else{


                    if(datosCliente.valor2==0){
                        console.log('No se puede dividir para cero')
                        throw new BadRequestException("Los datos ingresados no son correctos")
                    }else{
                        return datosCliente.valor1/datosCliente.valor2
                    }

                }
            }catch (e){
                throw new BadRequestException("Error con la peticion solicitada")
            }
        }else{
            return 'Debe registrar primeramente a un usuario'
        }






    }


    @Get('guardarNombre')
    obtenerCookie(
        @Query() parametroDeConsulta,
        @Res() res,

    ) {
        const nombre = parametroDeConsulta.nombre
        if(nombre){
            res.cookie('usuario', nombre)
            res.send("Usuario guardado")
        }else{
            throw new BadRequestException('Error en los datos de entrada')

        }


    }


    verificarUsuario(
        @Req() req
    ){

        const cookie=req.cookies
        if(cookie.usuario){
            return true
        }else{
            return false
        }


    }

    }
