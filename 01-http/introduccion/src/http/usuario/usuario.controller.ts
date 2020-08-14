import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

@Controller('usuario')

export class UsuarioController{

    public arregloUsuarios=[{
        id:1,
        nombre:'Lesly'

    },{
        id:2,
        nombre:'Madelein'
    },{
        id:3,
            nombre:'Rosario'
    }]

    public idActual=3


    constructor(//Inyeccion de dependencias
        private readonly _usuarioService:UsuarioService
    ){

    }
    //MOSTRAR TODOS
    @Get()
    async  mostrarTodos(){

        try{
            const respuesta= await this._usuarioService.buscarTodos()
            return respuesta
        }catch(e){
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:"Error del servidor"
            })
        }

       // return this.arregloUsuarios

    }

    //CREAR UNO
    @Post()
    async crearUno(
        @Body() params //parametros de cuerpo

    ){

        try{
            //Validacion del create DTO
            const respuesta=await this._usuarioService.crearUno(params);
            return respuesta;

        }catch(e){
            console.error(e);
            throw new BadRequestException({
                mensaje:"Error validando datos"
            })
            return "error en la validacion";

        }

        const nuevoUsuario={
            id:this.idActual+1,
            nombre:params.nombre
        };

        this.arregloUsuarios.push({
         id:this.idActual+1,
            nombre:params.nombre
        });

        this.idActual=this.idActual+1
        return nuevoUsuario
    }


    //OBTENER UNO
    @Get(':id')
    async verUno(
        @Param() parametroRuta

    ){

        let respuesta;
        try{
            const respuesta=await this._usuarioService.buscarUno(Number(parametroRuta.id))

        }catch(e){
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:"Error del servidor"
            })

        }
        if(respuesta){
            return respuesta
        }else{
            throw new NotFoundException({
                mensaje:"No existe el registro"
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
    ){

        const id=Number(parametroRuta.id)
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
        }

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

    ){
        let confirmacion

      try{
          const respuesta=await this._usuarioService.eliminarUno(Number(parametroRuta.id))

          if(respuesta.affected==1){
              return {
                  respuesta:'registro con id '+ parametroRuta.id+ ' eliminado'
              }
          }else{
              return {
                  respuesta:'Error. No existe registro con el id '+ parametroRuta.id
              }
          }
       
      }catch(e){
          console.error(e)
          throw  new InternalServerErrorException({
              mensaje:"Error del servidor "
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








}