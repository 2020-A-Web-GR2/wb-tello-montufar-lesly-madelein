import {BadRequestException, Body, Controller, Get, HttpCode, Param, Post, Query, Res, Session} from "@nestjs/common";
import {CategoriaService} from "./categoria.service";
import {CategoriaCreateDto} from "./dto/categoria.create.dto";
import {validate} from "class-validator";
import {CategoriaUpdateDto} from "./dto/categoria.update.dto";

@Controller('categoria')
export class CategoriaController{

    constructor( private readonly _categoriaService:CategoriaService) {
    }

    //Mostrar todos los datos de la entidad
    @Get()
    @HttpCode(200)
    async mostrarTodos(
        @Res() res
    ){
        try{
            const respuesta=await this._categoriaService.buscarTodosCategoria()

            res.render('admin/dashboard',{
                    categorias:respuesta,
                    page:'categoria'
            }

                )

        }catch (e) {
            throw new BadRequestException('Error en el servidor')
        }
    }


    //Crear una nueva categoria
    @Post('crear')
    @HttpCode(201)
   async  crearUnaCategoria(
        @Body() parametros,
        @Res() res
    ){
        let categoriaNueva
        try{
            const categoriaValidar=new CategoriaCreateDto()
            categoriaValidar.nombre=parametros.nombre
            const errores= await validate(categoriaValidar)
            if(errores.length>0){
                console.log('Errores', errores)
                throw new BadRequestException('Error en los datos')


            }else{
                categoriaNueva=categoriaValidar
            }

        }catch (e) {
            throw new BadRequestException('Error en los datos ')
        }

        if(categoriaNueva){
            try{
                const respuesta= await this._categoriaService.crearUnaCategoria(categoriaNueva)
                return res.redirect('/categoria')
            }catch (e) {
                throw new BadRequestException('Error en el servidor')
            }
        }

    }

    @Get('crearDesdeVista')
    async mostrarVistaCrear(
        @Res() res
    ){
        return res.render('admin/dashboard',{

                page:'crearCategoria'
            }
        )
    }


    @Get('editarDesdeVista')
    async editar(
        @Res() res,
        @Body() parametros
    ){


        return res.render('admin/dashboard',{

                page:'crearCategoria'
            }
        )
    }

    @Get('editar/:id')
    async crearCategoriaVistaModificar(
        @Res() res,
        @Query() parametrosConsulta,
        @Param() parametrosRuta,

    ) {


        let nuevaCategoria

            const id = Number(parametrosRuta.id)

            let categoriaEncontrada
            try {
                categoriaEncontrada = await this._categoriaService.mostrarUnaCategoria(id)
            } catch (error) {
                console.error('Error del servidor')
                return res.redirect('/productos/admin')
            }

            if (categoriaEncontrada) {
                return res.render(
                    'admin/dashboard',
                    {
                        page:'crearCategoria',
                        categoriaEncontrada: categoriaEncontrada

                    }
                )
            } else {
                return res.redirect('/productos/admin')
            }

    }



    //Busqueda de nombres de categorias
    @Get('nombre')
    nombre(){
        return this._categoriaService.buscarNombreCategoria()
    }

    //Obtener el ID de la categoria por nombre
    @Get('nombre/:nombre')
    obtener(
        @Param() parametro
    ){
      return this._categoriaService.buscarIdPorNombre(parametro.nombre)
    }

    //Modificar una categoria
    @Post('/:id')
    @HttpCode(200)
    async modificarCategoria(@Body() parametros,
                             @Param() parametroRuta,
    @Res()res
    ){
        let categoriaModificada
        try{
            const categoriaValidar=new CategoriaUpdateDto()
            categoriaValidar.nombre=parametros.nombre
            categoriaValidar.id=Number(parametroRuta.id)
            const errores= await validate(categoriaValidar)
            if(errores.length>0){
                console.log('Errores', errores)
                throw new BadRequestException('Error en los datos')


            }else{
                categoriaModificada=categoriaValidar

            }

        }catch (e) {
            throw new BadRequestException('Error en los datos ')
        }

        if(categoriaModificada){
            try{
                const respuesta= await this._categoriaService.modificarUnaCategoria(categoriaModificada)
                return res.redirect('/categoria')

            }catch (e) {
                throw new BadRequestException('Error en el servidor')
            }
        }

    }


    //Eliminar una categoria
    @Get('eliminar/:id')
    async eliminarDesdeVista(
        @Param() parametroRuta,
        @Res() res

    ){
        try{
            const id= Number(parametroRuta.id)
           const respuesta= await this._categoriaService.eliminarUnaCategoria(id)
            res.redirect('/categoria')

        }catch (e) {
            console.log(e)


        }
    }
}