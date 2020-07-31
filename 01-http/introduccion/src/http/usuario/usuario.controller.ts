import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";

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

    //MOSTRAR TODOS
    @Get()
    mostrarTodos(){
        return this.arregloUsuarios
    }

    //CREAR UNO
    @Post()
    crearUno(
        @Body() params //parametros de cuerpo

    ){

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
    verUno(
        @Param() parametroRuta

    ){
        const indice=this.arregloUsuarios.findIndex(
            //(usuario)=> usuario.id===Number(parametrosRuta.id)
            (usuario:{id:number, nombre:string })=> usuario.id=== Number(parametroRuta.id)
        )

        return this.arregloUsuarios[indice]

    }


    @Put(':id')
    editar(
        @Param() parametroRuta,
        @Body() parametroCuerpo
    ){

        const indice=this.arregloUsuarios.findIndex(
            //(usuario)=> usuario.id===Number(parametrosRuta.id)
            (usuario:{id:number, nombre:string })=> usuario.id=== Number(parametroRuta.id)
        )
        this.arregloUsuarios[indice].nombre=parametroCuerpo.nombre

        return this.arregloUsuarios[indice]

    }


    //ELIMINAR USUARIO
    @Delete(':id')
    eliminar(
        @Param() parametroRuta,

    ){

        const indice=this.arregloUsuarios.findIndex(
            //(usuario)=> usuario.id===Number(parametrosRuta.id)
            (usuario:{id:number, nombre:string })=> usuario.id=== Number(parametroRuta.id)
        )
        this.arregloUsuarios.splice(indice,1)
        return this.arregloUsuarios[indice]

    }








}