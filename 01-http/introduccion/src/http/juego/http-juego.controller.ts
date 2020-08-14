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
    Query,
    Req, Res
} from "@nestjs/common";
import {MascotaCreateDto} from "../dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";


//Escucha las peticiones pero de que /juegos-http Prefijo a cada controlador
//http://localhost:3001/juegos-http
@Controller('juegos-http')

export class HttpJuegoController{

    @Get('hola')
    @HttpCode(201)
    holaGet(){
        throw new BadRequestException('No envia nada')
            //return 'hola Get'

    }

    @Post('hola')
    @HttpCode(202)
    holaPost(){
        return 'Es un post :)';
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('cache-control', 'none')
    @Header('EPN', 'probando las cosas')
    holaDelete(){
        return 'Es un delete';
    }
    //PARAMETROS DE RUTA
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ){
        if(isNaN(parametrosRuta.edad) || isNaN(parametrosRuta.altura)){
            throw new BadRequestException('No son números')
        }else{
            const edad= Number(parametrosRuta.edad)
            const altura= Number(parametrosRuta.altura)
            return edad+altura
        }

        //console.log('Parametros',parametrosRuta);
        //return 'ok';
    }

    @Get('parametros-consulta')
    parametrosConsulta(@Query() parametrosDeConsulta
    ){

        if(parametrosDeConsulta.nombre && parametrosDeConsulta.apellido){

            return parametrosDeConsulta.nombre +" "+ parametrosDeConsulta.apellido
        }else{

            return (":)")

        }


    }

    @Post('parametros-cuerpo')
    @HttpCode(200)
    async parametrosCuerpo(
       @Body() parametrosDeCuerpo
    ){
        //promesa
        const mascotaValida=new MascotaCreateDto();
        mascotaValida.nombre=parametrosDeCuerpo.nombre;
        mascotaValida.casada=parametrosDeCuerpo.casada;
        mascotaValida.edad=parametrosDeCuerpo.edad;
        mascotaValida.ligada=parametrosDeCuerpo.ligada;
        mascotaValida.peso=parametrosDeCuerpo.peso;
        try{
            const errores:ValidationError[]=await validate(mascotaValida)
            if(errores.length>0){
                console.error('Errores',errores)
                throw new BadRequestException("Error validando")

            }else{
                return{
                    mensaje:'Se ha creado correctamente'
                }
            }
        }catch(e){
            console.error('Error',e);
            throw new BadRequestException("Error validando");

        }

       /* console.log('Parametros de cuerpo', parametrosDeCuerpo)
        const res=parametrosDeCuerpo.mascota.edad + parametrosDeCuerpo.mascota.peso
        return 'Registro creado'*/

    }


    //1Guardar una cookie insegura
    //2 guardar una cookie segura
    //3 mostrar cookie

    @Get("guardarCookieInsegura")
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req, //request-peticion
        @Res() res //Responde-respuesta
    ){
        res.cookie(
            'galletaInsegura', //nombre
            'Tengo hambre' //valor
        )
        res.send({
            mensaje: 'ok'
        });
    }


    @Get("guardarCookieSegura")
    guardarCookieSegura(

        @Req() req, //request-peticion
        @Res() res //Responde-respuesta
    ){
        res.cookie(
            'galletaSegura', //nombre
            'Web:3',
        {
            secure:true
        }

        )
        res.send({
            mensaje: 'ok'
        });
    }


    @Get("mostrarCookies")
    mostrarCookies(

        @Req() req, //request-peticion
    ){
        const mensaje={
            sinFirmar:req.cookies,
            firmadas:req.signedCookies
        }
      return mensaje

    }


    @Get("guardarCookieFirmada")
    guardarCookieFirmada(

        @Res() res,
        @Headers() headers //cabeceras de peticion
    ){
        console.log('Headers',headers) //cabeceras de respuesta
        res.header('Cabecera','Dinamica')
       res.cookie('firmada','poliburguer',{signed:true})
        const mensaje={
           mensaje:'ok'
        }

        res.send(mensaje)

    }




}