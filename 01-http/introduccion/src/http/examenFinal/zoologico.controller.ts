import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post, Query, Req,
    Res, Session
} from "@nestjs/common";
import {ZoologicoService} from "./zoologico.service";
import {ZoologicoCreateDto} from "./dto/zoologico.create-dto";
import {isEmpty, isNotEmpty, validate} from "class-validator";
import {ZoologicoUpdateDto} from "./dto/zoologico.update-dto";

@Controller('zoo')
export class ZoologicoController {

    constructor(
        private readonly _zoologicoService: ZoologicoService
    ) {
    }


    @Get()
    mostrarTodos(
        @Res() res,
        @Query() consulta
    ){
        res.render('zoo/login',{
            error:consulta
        })

       //return this._zoologicoService.buscarTodos()
    }


    @Post('login')
    login(
        @Body() parametrosConsulta,
        @Res() response,
        @Session() session
    ){
        // validamos datos
        const usuario = parametrosConsulta.usuario;
        const password = parametrosConsulta.password;
        if (usuario == 'Adrian' && password == '1234') {
            session.usuario = usuario
            return response.redirect('principal');
        } else{
            return response.redirect('/zoo?error=Datos incorrectos')

        }
    }

    @Get('principal')
    async mostrarGeneral(
        @Session() session,
        @Res() response,
        @Query() parametrosConsulta
    ) {
        const estaLogeado = session.usuario;
        if (estaLogeado) {
            let resultadoEncontrado
            try {
                resultadoEncontrado = await this._zoologicoService.buscarTodos()

            } catch (e) {
                throw new InternalServerErrorException('Error encontrando usuarios')
            }

            if (resultadoEncontrado) {
                response.render(
                    'zoo/principal', {
                        listaAnimales: resultadoEncontrado,
                        resultado:parametrosConsulta
                    });
            } else {
                throw new NotFoundException('No se encontraron usuarios')
            }

        } else {
            return response.redirect('/zoo')
        }
    }

    @Get('crear')
    async crearNuevo(
        @Res() response,
        @Session() session,
        @Query() parametros

    ){
        const estaLogeado = session.usuario;
        if (estaLogeado) {
            return response.render('zoo/crear')
        } else {
            return response.redirect('/zoo')
        }


    }

    @Post('crear')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Session() session,
        @Res() response
    ){
        const estaLogeado = session.usuario;
        let nuevoAnimal
        if (estaLogeado) {
            try{
                const nuevoZooDto= new ZoologicoCreateDto()
                nuevoZooDto.nombre=parametrosCuerpo.nombre
                nuevoZooDto.familia=parametrosCuerpo.familia
                nuevoZooDto.clase=parametrosCuerpo.clase
                nuevoZooDto.alimentacion=parametrosCuerpo.alimentacion
                nuevoZooDto.peso=Number(parametrosCuerpo.peso)
                const errores=await validate(nuevoZooDto)
                if(errores.length>0){
                    console.log(errores)
                    return response.redirect('crear?res=Error en validacion')
                }else{
                    nuevoAnimal=nuevoZooDto
                }

            }catch (e) {
                console.log(e)

            }

            if(nuevoAnimal){
                try{
                    const respuesta=await this._zoologicoService.crearUno(nuevoAnimal)
                    return response.redirect('principal?res= Creado con exito')
                }catch (e) {
                    return response.redirect('principal?res=No se pudo crear el nuevo elemento')
                }
            }

        } else {
            return response.redirect('/zoo')
        }
    }




    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){

        let nuevaEntidad
        try{
        const nuevoAnimal= new ZoologicoCreateDto()
        nuevoAnimal.nombre=parametrosCuerpo.nombre
        nuevoAnimal.clase=parametrosCuerpo.clase
        nuevoAnimal.familia=parametrosCuerpo.familia
        nuevoAnimal.alimentacion=parametrosCuerpo.alimentacion
        nuevoAnimal.peso=parametrosCuerpo.peso

        const errores=await validate(nuevoAnimal)
            if(errores.length>0){
                console.log(errores)
                throw new BadRequestException('Error en datos ')
            }else{
                nuevaEntidad=nuevoAnimal
            }

        }catch (e) {
            throw new BadRequestException('Error en datos ')

        }

        if(nuevaEntidad){
            try{
                const respuesta=await this._zoologicoService.crearUno(nuevaEntidad)
                return respuesta
            }   catch (e) {
                console.log(e)
                throw new InternalServerErrorException('Error en el servidor')
            }

        }



    }


    @Get('eliminar/:id')
    async eliminarUno(
        @Param() parametroRuta,
        @Res() res,
        @Session() session
    ){
        const estaLogeado = session.usuario;
        let nuevoAnimal
        if (estaLogeado) {
            try{
                const respuesta=await this._zoologicoService.eliminarUno(Number(parametroRuta.id))
                return res.redirect('/zoo/principal?res= Eliminado con exito')

            }catch (e) {
                console.log(e)
                return res.redirect('/zoo/principal?res=Error. No se pudo eliminar')
            }
        }else{
            return res.redirect('/zoo')
        }


    }


    @Get('editar/:id')
    async crearUsuarioVistaModificar(
        @Res() res,
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Session() session
    ) {

        const estaLogeado = session.usuario;
        let nuevoAnimal
        if (estaLogeado) {
            const id = Number(parametrosRuta.id)

            let usuarioEncontrado
            try {
                usuarioEncontrado = await this._zoologicoService.verUno(id)
            } catch (error) {
                console.error('Error del servidor')
                return res.redirect('/zoo/principal?res=Error buscando animal del zoologico')
            }

            if (usuarioEncontrado) {
                return res.render(
                    'zoo/crear',
                    {
                        error: parametrosConsulta.res,
                        animalEncontrado: usuarioEncontrado

                    }
                )
            } else {
                return res.redirect('/zoo/principal?res=Datos no encontrados')
            }
        }else{
            return res.redirect('/zoo')
        }

    }

        @Post('editarDesdeVista/:id')
        async editarDesdeVista(
             @Body() parametrosCuerpo,
             @Param() parametroRuta,
             @Session() session,
             @Res() response
        ){

            const estaLogeado = session.usuario;
            let nuevoAnimal
            if (estaLogeado) {
                try{
                    const nuevoZooDto= new ZoologicoUpdateDto()
                    nuevoZooDto.familia=parametrosCuerpo.familia
                    nuevoZooDto.clase=parametrosCuerpo.clase
                    nuevoZooDto.alimentacion=parametrosCuerpo.alimentacion
                    nuevoZooDto.peso=Number(parametrosCuerpo.peso)
                    const errores=await validate(nuevoZooDto)
                    if(errores.length>0){
                        console.log(errores)
                        return response.redirect('zoo/crear?res=Error en validacion')
                    }else{
                        nuevoAnimal=nuevoZooDto
                        nuevoAnimal.nombre=parametrosCuerpo.nombre
                        nuevoAnimal.id=Number(parametroRuta.id)
                    }

                }catch (e) {
                    console.log(e)

                }

                if(nuevoAnimal){
                    try{
                        const respuesta=await this._zoologicoService.modificarUno(nuevoAnimal)
                        return response.redirect('/zoo/principal?res= Registro modificado con exito')
                    }catch (e) {
                        console.log(e)
                        return response.redirect('/zoo/principal?res=No se pudo editar el registro')
                    }
                }

            } else {
                return response.redirect('/zoo')
            }
        }

    @Get('principalConsulta')
    async mostrarGeneralConsulta(
        @Session() session,
        @Res() response,
        @Query() parametrosConsulta
    ) {
        const estaLogeado = session.usuario;
        if (estaLogeado) {
            let resultadoEncontrado
            try {
                resultadoEncontrado = await this._zoologicoService.BusquedaPor3Parametros(parametrosConsulta.busqueda)

            } catch (e) {
                throw new InternalServerErrorException('Error encontrando usuarios')
            }

            if (resultadoEncontrado) {
                response.render(
                    'zoo/principal', {
                        listaAnimales: resultadoEncontrado,
                        resultado:parametrosConsulta
                    });
            } else {
                throw new NotFoundException('No se encontraron usuarios')
            }

        } else {
            return response.redirect('/zoo')
        }
    }

    @Get('logout')
    logout(
        @Session() session,
        @Res() response,
        @Req() request
    ) {

        session.username = undefined;
        request.session.destroy();
        return response.redirect('/zoo')

    }











    }