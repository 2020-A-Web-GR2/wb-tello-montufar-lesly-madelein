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
    puntaje=100;
    bandera=false;

    @Get('suma/:n2')
    @HttpCode(200)
    async sumar(
        @Query() parametroConsultan1,
        @Param() parametroRutan2,
        @Req() req,
        @Res() res
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
                    const respuesta=datosCliente.valor1+datosCliente.valor2
                    this.verificarPuntaje(respuesta)
                    if(this.bandera==true){
                        res.send({
                            mensaje:"Respuesta:"+respuesta+ " "+req.cookies.usuario+' has excedido el limite. se ha reiniciado en 100'
                        });
                    }else{
                        res.send({
                            mensaje: 'Respuesta:'+respuesta+' los puntos sobrantes son: '+this.puntaje
                        });
                    }




                }
            }catch(e){

                throw new BadRequestException("Error al usar class validator");
            }
        }else{
            res.send({
                mensaje: 'Debe registrar primeramente un usuario'
            });
        }


    }


    @Put('resta')
    @HttpCode(201)
    async restar(
        @Body() parametroCuerpo,
        @Req() req,
        @Res() res
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

                    const respuesta=datosCliente.valor1-datosCliente.valor2
                    this.verificarPuntaje(respuesta)
                    if(this.bandera==true){
                        res.send({
                            mensaje:"Respuesta:"+respuesta+ " "+req.cookies.usuario+' has excedido el limite. se ha reiniciado el puntaje en 100'
                        });
                    }else{
                        res.send({
                            mensaje: 'Respuesta:'+respuesta+' los puntos sobrantes son: '+this.puntaje
                        });
                    }



                }
            }catch (e){
                throw new BadRequestException("Error con class-validator")
            }
        }else{
            res.send({
                mensaje: 'Debe registrar primeramente un usuario'
            });
        }



    }

    @Delete('multiplicacion')
    @HttpCode(200)
    async multiplicar(
        @Headers() datos,
        @Req() req,
        @Res() res
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

                    const respuesta=datosCliente.valor1*datosCliente.valor2
                    this.verificarPuntaje(respuesta)
                    if(this.bandera==true){
                        res.send({
                            mensaje:"Respuesta:"+respuesta+ " "+req.cookies.usuario+' has excedido el limite. se ha reiniciado el puntaje en 100'
                        });
                    }else{
                        res.send({
                            mensaje: 'Respuesta:'+respuesta+' los puntos sobrantes son: '+this.puntaje
                        });
                    }


                }
            }catch (e){
                throw new BadRequestException("Error con class-validator")
            }

        }else{
            res.send({
                mensaje: 'Debe registrar primeramente un usuario'
            });
        }



    }

    @Post('division/:n1/div/:n2')
    @HttpCode(201)
    async dividir(
        @Param() parametrosRuta,
         @Req() req,
        @Res() res

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


                        throw new BadRequestException("No se puede dividir para cero")



                    }else{

                        const respuesta=datosCliente.valor1/datosCliente.valor2
                        this.verificarPuntaje(respuesta)
                        if(this.bandera==true){
                            res.send({
                                mensaje:"Respuesta:"+respuesta+ " "+req.cookies.usuario+' has excedido el limite. se ha reiniciado el puntaje en 100'
                            });
                        }else{
                            res.send({
                                mensaje: 'Respuesta:'+respuesta+' los puntos sobrantes son: '+this.puntaje
                            });
                        }


                    }

                }
            }catch (e){
                throw new BadRequestException("Error con la peticion solicitada")
            }
        }else{
            res.send({
                mensaje: 'Debe registrar primeramente un usuario'
            });
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
            res.cookie('puntaje',this.puntaje,{signed:true})
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





    public verificarPuntaje(respuesta){

        const temporal=this.puntaje-Math.abs(respuesta)
        if(temporal<=0){
            this.puntaje=100;
            this.bandera=true;


        }else{
            this.puntaje=temporal
            this.bandera=false
        }
    }

    }
