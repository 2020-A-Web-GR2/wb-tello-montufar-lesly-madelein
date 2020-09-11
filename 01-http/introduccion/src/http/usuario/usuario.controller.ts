import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {MascotaCreateDto} from "../dto/mascota.create-dto";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";
import {UsuarioUpdateDto} from "./dto/usuario.update-dto";
import {MascotaService} from "../mascota/mascota.service";
import {catchError} from "rxjs/operators";
import {UsuarioEntity} from "./usuario.entity";

@Controller('usuario')

export class UsuarioController {

    public arregloUsuarios = [{
        id: 1,
        nombre: 'Lesly'

    }, {
        id: 2,
        nombre: 'Madelein'
    }, {
        id: 3,
        nombre: 'Rosario'
    }]

    public idActual = 3


    constructor(//Inyeccion de dependencias
        private readonly _usuarioService: UsuarioService,
        private readonly _mascotaService: MascotaService
    ) {

    }

    //MOSTRAR TODOS
    @Get()
    async mostrarTodos() {

        try {
            const respuesta = await this._usuarioService.buscarTodos()
            return respuesta
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: "Error del servidor"
            })
        }

        // return this.arregloUsuarios

    }

    //CREAR UNO
    @Post()
    async crearUno(
       // @Body() parametrosCuerpo //parametros de cuerpo
       @Body() params

    ) {

            let mensajePantalla


            //Validacion del create DTO
            const usuarioValido = new UsuarioCreateDto();
            usuarioValido.cedula = params.cedula
            usuarioValido.nombre = params.nombre
            usuarioValido.apellido = params.apellido
            usuarioValido.sueldo = params.sueldo
            usuarioValido.fechaHoraNacimiento = params.fechaHoraNacimiento
            usuarioValido.fechaNacimiento = params.fechaNacimiento
            try {
                const errores: ValidationError[] = await validate(usuarioValido)
                if (errores.length > 0) {
                    console.error('Errores', errores)
                    throw new BadRequestException("Error validando")


                } else {
                    try {
                        const respuesta = await this._usuarioService.crearUno(params);
                        return respuesta;
                    } catch (e) {
                        console.error(e);
                        throw new BadRequestException({
                            mensaje: "Error en el servidor"
                        })

                    }

                }


            } catch (e) {
                console.error('Error', e);
                throw new BadRequestException("Error validando");
            }

            // const respuesta=await this._usuarioService.crearUno(usuarioValido);


            /* const nuevoUsuario={
                 id:this.idActual+1,
                 nombre:params.nombre
             };

             this.arregloUsuarios.push({
              id:this.idActual+1,
                 nombre:params.nombre
             });

             this.idActual=this.idActual+1
             return nuevoUsuario*/

    }


    //OBTENER UNO
    @Get(':id')
    async verUno(
        @Param() parametroRuta
    ) {

        let respuesta;
        try {
            const respuesta = await this._usuarioService.buscarUno(Number(parametroRuta.id))
            return respuesta

        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: "Error del servidor"
            })

        }
        if (respuesta) {
            return respuesta
        } else {
            throw new NotFoundException({
                mensaje: "No existe el registro"
            })
        }


        /*const indice=this.arregloUsuarios.findIndex(
            //(usuario)=> usuario.id===Number(parametrosRuta.id)
            (usuario:{id:number, nombre:string })=> usuario.id=== Number(parametroRuta.id)
        )

        return this.arregloUsuarios[indice]*/

    }


    @Put(':id')
    async editar(
        @Param() parametroRuta,
        @Body() parametroCuerpo
    ) {

        const usuarioModificado = new UsuarioUpdateDto()
        usuarioModificado.nombre = parametroCuerpo.nombre
        usuarioModificado.apellido = parametroCuerpo.apellido
        usuarioModificado.sueldo = parametroCuerpo.sueldo
        usuarioModificado.fechaHoraNacimiento = parametroCuerpo.fechaHoraNacimiento
        usuarioModificado.fechaNacimiento = parametroCuerpo.fechaNacimiento

        try {
            const errores: ValidationError[] = await validate(usuarioModificado)
            if (errores.length > 0) {
                console.error('Errores', errores)
                throw new BadRequestException("Error validando")
                return

            } else {
                try {
                    const usuarioEditado = parametroCuerpo
                    usuarioEditado.id = Number(parametroRuta.id)
                    const respuesta = await this._usuarioService.editarUno(usuarioEditado)
                    return respuesta;
                } catch (e) {
                    throw  new InternalServerErrorException({
                        mensaje: "Error "
                    })

                }

            }

        } catch (e) {
            throw new BadRequestException("Error con class validator")
        }

        // Modificar un usuario sin dto
        /* const id=Number(parametroRuta.id)
         const usuarioEditado=parametroCuerpo
         usuarioEditado.id=id
         let respuesta
         try{

            const respuesta=await this._usuarioService.editarUno(usuarioEditado)
             return respuesta


         }catch(e){
             console.error(e)
             throw  new InternalServerErrorException({
                 mensaje:"Error "
             })
         }*/

        //MODIFICAR SIN BASE DE DATOS
        /*const indice=this.arregloUsuarios.findIndex(
            //(usuario)=> usuario.id===Number(parametrosRuta.id)
            (usuario:{id:number, nombre:string })=> usuario.id=== Number(parametroRuta.id)
        )
        this.arregloUsuarios[indice].nombre=parametroCuerpo.nombre

        return this.arregloUsuarios[indice]*/

    }


    //ELIMINAR USUARIO
    @Delete(':id')
    async eliminar(
        @Param() parametroRuta,
    ) {
        let confirmacion

        try {
            const respuesta = await this._usuarioService.eliminarUno(Number(parametroRuta.id))

            if (respuesta.affected == 1) {
                return {
                    respuesta: 'registro con id ' + parametroRuta.id + ' eliminado'
                }
            } else {
                return {
                    respuesta: 'Error. No existe registro con el id ' + parametroRuta.id
                }
            }

        } catch (e) {
            console.error(e)
            throw  new InternalServerErrorException({
                mensaje: "Error del servidor "
            })
        }

        /*
        const indice=this.arregloUsuarios.findIndex(
            //(usuario)=> usuario.id===Number(parametrosRuta.id)
            (usuario:{id:number, nombre:string })=> usuario.id=== Number(parametroRuta.id)
        )
        this.arregloUsuarios.splice(indice,1)
        return this.arregloUsuarios[indice]*/

    }


    @Post('crearUsuarioYCrearMascota')
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ) {
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota
        // Validar Usuario
        // Valodar Mascota
        // -> CREAMOS LOS DOS
        let usuarioCreado;
        try {
            usuarioCreado = await this._usuarioService.crearUno(usuario);
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error creando usuario',
            })
        }
        if (usuarioCreado) {
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada;
            try {
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota);
            } catch (e) {
                console.error(e);
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })
            }
            if (mascotaCreada) {
                return {
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            } else {
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })
            }
        } else {
            throw new InternalServerErrorException({
                mensaje: 'Error creando mascota',
            })
        }

    }



    // http://localhost:3001/usuario/vista/usuario
    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ){
        const nombreControlador = 'Lesly';
        res.render(
            'usuario/ejemplo', // Nombre de la vista (archivo)
            {   // parametros de la vista
                nombre: nombreControlador,
            })
    }


    @Get('vista/faq')
    faq(
        @Res() res
    ){


        res.render(
            'usuario/faq')
    }


    @Get('vista/inicio')
    async inicio(
        @Res() res,
        @Query() parametrosConsulta
    ){
        let resultadoEncontrado
        try{
            resultadoEncontrado=await this._usuarioService.buscarTodos(parametrosConsulta.busqueda)
        }catch (e) {
            throw new InternalServerErrorException('Error encontrando usuarios')
        }

        if(resultadoEncontrado){
            res.render(
                'usuario/inicio', {
                    arregloUsuarios:resultadoEncontrado,
                    parametrosConsulta:parametrosConsulta
                });
        }else{
            throw new NotFoundException('No se encontraron usuarios')
        }


    }




    @Get('vista/login')
    login(
        @Res() res
    ){

        res.render('usuario/login')
    }


    @Get('vista/crear')
    crearUsuarioVista(
        @Res() res,
        @Query() parametrosConsulta
    ){

        return res.render(
            'usuario/crear',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
                cedula: parametrosConsulta.cedula
            }
        )
    }




    @Get('vista/editar/:id')
    async crearUsuarioVistaModificar(
        @Res() res,
        @Query() parametrosConsulta,
        @Param() parametrosRuta
    ){

        const id=Number(parametrosRuta.id)

        let usuarioEncontrado
        try{
            usuarioEncontrado=await this._usuarioService.buscarUno(id)
        }catch(error){
            console.error('Error del servidor')
            return res.redirect('/usuario/vista/inicio?mensaje=Error buscando usuario')
        }

        if(usuarioEncontrado){
            return res.render(
                'usuario/crear',
                {
                    error: parametrosConsulta.error,
                    usuario:usuarioEncontrado

                }
            )
        }else{
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario no encontrado')
        }

    }




    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res
    ){

        // Validar los datos con un rico DTO
        let nombreApellidoConsulta;
        let cedulaConsulta;
        if (parametrosCuerpo.cedula && parametrosCuerpo.nombre && parametrosCuerpo.apellido) {
            nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
            if (parametrosCuerpo.cedula.length === 10) {
                cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
            } else {
                const mensajeError = 'Cedula incorrecta'
                return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta)
            }
        } else {
            nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
            cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
            const mensajeError = 'Enviar cedula(10) nombre y apellido'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError+ nombreApellidoConsulta + cedulaConsulta )
        }
        let respuestaCreacionUsuario;
        try {
            respuestaCreacionUsuario = await this._usuarioService.crearUno(parametrosCuerpo);
        } catch (error) {
            console.error(error);
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta)
        }
        if (respuestaCreacionUsuario) {
            return res.redirect('/usuario/vista/inicio');
        } else {
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta);
        }
    }


    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametroRuta,
        @Body() parametrosCuerpo,
        @Res() res

    ){

        let nombreApellidoConsulta;
        let cedulaConsulta;

        const usuarioEditado={

            id:Number(parametroRuta.id),
            nombre:parametrosCuerpo.nombre,
            apellido:parametrosCuerpo.apellido,
            cedula:parametrosCuerpo.cedula
        } as UsuarioEntity;

        try{
            console.log(usuarioEditado)
            await this._usuarioService.editarUno(usuarioEditado)
            return res.redirect(
                '/usuario/vista/inicio?mensaje=Usuario editado'
            )
        }catch (e) {
            console.log(e)
            return res.redirect(
                '/usuario/vista/inicio?mensaje=Error editando usuario'
            )
        }


    }





    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametroRuta,
        @Res() res

    ){
         try{
            const id= Number(parametroRuta.id)
             await this._usuarioService.eliminarUno(id)
             return res.redirect('/usuario/vista/inicio?mensaje=Usuario eliminado')

         }catch (e) {
             console.log(e)
             return res.redirect('/usuario/vista/inicio?error=Error eliminando usuario')

          }
    }










}








