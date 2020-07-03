import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post} from "@nestjs/common";

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
}