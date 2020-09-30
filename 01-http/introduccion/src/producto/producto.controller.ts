import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    InternalServerErrorException,
    Param, Session,
    Post, Query, Req, Res
} from "@nestjs/common";
import {ProductoService} from "./producto.service";
import {ProductoCreateDto} from "./dto/producto.create.dto";
import {validate} from "class-validator";
import {ProductoUpdateDto} from "./dto/producto.update.dto";
import {CategoriaService} from "../categoria/categoria.service";
import {ImagenProductoEntity} from "../imagen-producto/imagen-producto.entity";
import {ImagenProductoService} from "../imagen-producto/imagen-producto.service";
import {ImagenProductoCreateDto} from "../imagen-producto/dto/imagen-producto.create.dto";
import {UsuarioEntity} from "../http/usuario/usuario.entity";

@Controller('productos')
export class ProductoController{

    constructor(
        private readonly _productoService:ProductoService,
        private readonly _categoriaService:CategoriaService,
        private readonly _imagenProductoService:ImagenProductoService
    ) {
    }

    //ADMIN

    @Get('productosAdmin')
    async productosAdmin(
        @Res() res,
        @Query() parametrosConsulta
    ){

        let productos
        try {

            productos = await this._productoService.buscarTodosProductosAdmin();

        } catch (error) {
            throw new InternalServerErrorException('Error encontrando productos')
        }
        if(productos){
            console.log(productos)
            res.render(
                'admin/dashboard',
                {
                    page: 'producto',
                    productos:productos

                }
            )

        } {
            throw new InternalServerErrorException('Error encontrando productos')
        }

    }


    @Get('crearDesdeVista')
    async mostrarVistaCrear(
        @Res() res
    ){
        const categorias=await this._categoriaService.buscarTodosCategoria()
        return res.render('admin/dashboard',{

                page:'crearProducto',
                categorias:categorias
            }
        )
    }


    @Post('crear')
    @HttpCode(201)
    async crearProductoVista(
        @Body() parametros,
        @Res() res
    ){
        let producto
        try{
            console.log('Ingrese')
            console.log(parametros)
            //Validar las entradas

            const productoValidar= new ProductoCreateDto()
            productoValidar.codigo=parametros.codigo
            productoValidar.descripcion=parametros.descripcion
            productoValidar.nombre=parametros.nombre
            productoValidar.precio=Number(parametros.precio)
            productoValidar.cantidad=Number(parametros.cantidad)
            productoValidar.fechaInicio=parametros.fechaInicio
            productoValidar.fechaFin=parametros.fechaFin
            productoValidar.categoria=parametros.categoria.value

            console.log(parametros)
            const errores=await validate(productoValidar)
            if(errores.length>0){
                console.log('Errores', errores)

            }else{
                producto=productoValidar

            }
        }catch(e){
            throw new BadRequestException('Error con class-validator')
        }

        if(producto){
            try{
                const respuesta=await this._productoService.crearUnProducto(producto)
                const id=await this._productoService.bucarPorNombre2(producto.nombre)
                console.log('ID SUPUESTO',id[0].id)

                try{
                    const imagenProducto={
                        producto:id[0],
                        url:parametros.imagenes
                    } as ImagenProductoEntity
                    console.log(imagenProducto)
                    const imagenProducto2=await this._imagenProductoService.crearImagenProducto(imagenProducto)
                    return res.redirect('/productos/productosAdmin')
                }catch (e) {
                    throw new InternalServerErrorException('Error en el servidor')
                }


            }catch (e) {
                throw new InternalServerErrorException('Error en el servidor')
            }

        }


    }


    //Eliminar un producto
    @Get('eliminar/:id')
    async eliminarDesdeVista(
        @Param() parametroRuta,
        @Res() res

    ){
        try{
            const id= Number(parametroRuta.id)
            const imagenes= await this._imagenProductoService.eliminarImagenProductoPorProducto(id)
            console.log(imagenes)
            const respuesta= await this._productoService.eliminarUnProducto(id)
            res.redirect('/productos/productosAdmin')

        }catch (e) {
            console.log(e)


        }
    }

    //ACTUALIZAR ojo****
    @Get('editar/:id')
    async crearCategoriaVistaModificar(
        @Res() res,
        @Query() parametros,
        @Param() parametrosRuta,

    ) {

        let nuevaCategoria

        const id = Number(parametrosRuta.id)

        let productoEncontrado
        let categorias
        try {
            productoEncontrado = await this._productoService.mostrarUnProducto(id)
            categorias=await this._categoriaService.buscarTodosCategoria()
            console.log('Producto',productoEncontrado)
            console.log(categorias)
        } catch (error) {
            console.error('Error del servidor')
            return res.redirect('/productos/admin')
        }

        if (productoEncontrado) {
            return res.render(
                'admin/dashboard',
                {
                    page:'crearProducto',
                    productoEncontrado: productoEncontrado,
                    categorias:categorias

                }
            )
        } else {
            return res.redirect('/productos/admin')
        }

    }




    @Post('/:id')
    @HttpCode(201)
    async modificarProducto2(
        @Body() parametros,
        @Param()  parametroRuta,
        @Res() res
    ){
        let producto
        try{
            //Validar las entradas
            const productoValidar= new ProductoUpdateDto()
            productoValidar.codigo=parametros.codigo
            productoValidar.descripcion=parametros.descripcion
            productoValidar.nombre=parametros.nombre
            productoValidar.precio=Number(parametros.precio)
            productoValidar.cantidad=Number(parametros.cantidad)
            productoValidar.fechaInicio=parametros.fechaInicio
            productoValidar.fechaFin=parametros.fechaFin
            productoValidar.categoria=parametros.categoria.value
            productoValidar.id=Number(parametroRuta.id)

            const errores=await validate(productoValidar)
            if(errores.length>0){
                console.log('Errores', errores)
                throw new BadRequestException('Error con class-validator')
            }else{
                producto=productoValidar

            }
        }catch(e){
            throw new BadRequestException('Error con class-validator')
        }

        if(producto){
            try{
                const respuesta=await this._productoService.modificarUnProducto(producto)
                res.redirect('./productosAdmin')
            }catch (e) {
                throw new InternalServerErrorException('Error en el servidor')
            }

        }
    }


    //ADMIN


    //Mostrar todos los productos
    @Get()
    async productos(
        @Res() res,
        @Session() session,
        @Body() parametrosCuerpo,
        @Query() parametrosConsulta
    ){
        if(typeof session == undefined){
            res.render('product');
        } else {
            let productos
            try {
                if(parametrosConsulta.busqueda !== undefined){
                    productos = await this._productoService.buscarTodosProductos(parametrosConsulta.busqueda);
                } else {
                    productos = await this._productoService.buscarTodosProductos();
                }
            } catch (error) {
                throw new InternalServerErrorException('Error encontrando productos')
            }
            if(productos){
                console.log(productos)
                res.render(
                    'product', {
                        nombre: session.nombre,
                        productos: productos
                    }
                );
            } {
                throw new InternalServerErrorException('Error encontrando productos')
            }
        }
    }



    @Get('/:nombre')
    async mostrarPasteles(
        @Res() response,
        @Param() parametroRuta
    ){

        let producto
        //   return res.render('product')
        try{
            if(parametroRuta.nombre=='todos'){
                const respuesta=await this._productoService.buscarProductosImagen()
                const categorias=await this._categoriaService.buscarNombreCategoria()

                return response.render('product',{
                    productoImagen:respuesta,
                    categorias:categorias,
                    busqueda:parametroRuta
                })

            }else{
                const idCategoria=await this._categoriaService.buscarIdPorNombre(parametroRuta.nombre)
                const respuesta=await this._productoService.buscarPorCategoria(idCategoria[0].id)
                const categorias=await this._categoriaService.buscarNombreCategoria()

                return response.render('product',{
                        productoImagen:respuesta,
                        categorias:categorias,
                        busqueda:parametroRuta
                    }

                )
            }

        }catch (e) {
            throw new BadRequestException('Error en servidor')
        }
    }








    //Crear un nuevo producto
    @Post()
    @HttpCode(201)
    async crearProducto(
        @Body() parametros
    ){
        let producto
        try{
            //Validar las entradas
            const productoValidar= new ProductoCreateDto()
            productoValidar.codigo=parametros.codigo
            productoValidar.descripcion=parametros.descripcion
            productoValidar.nombre=parametros.nombre
            productoValidar.precio=parametros.precio
            productoValidar.cantidad=parametros.cantidad
            productoValidar.fechaInicio=parametros.fechaInicio
            productoValidar.fechaFin=parametros.fechaFin
            productoValidar.categoria=parametros.categoria

            const errores=await validate(productoValidar)
            if(errores.length>0){
                console.log('Errores', errores)
                return 'Error en datos'
            }else{
                producto=productoValidar
            }
        }catch(e){
                throw new BadRequestException('Error con class-validator')
        }

        if(producto){
            try{
                const respuesta=await this._productoService.crearUnProducto(producto)
                return respuesta
            }catch (e) {
                throw new InternalServerErrorException('Error en el servidor')
            }

        }


    }


    //modificar un producto

    @Post('/:id')
    @HttpCode(201)
    async modificarProducto(
        @Body() parametros,
        @Param()  parametroRuta
    ){
        let producto
        try{
            //Validar las entradas
            const productoValidar= new ProductoUpdateDto()
            productoValidar.codigo=parametros.codigo
            productoValidar.descripcion=parametros.descripcion
            productoValidar.nombre=parametros.nombre
            productoValidar.precio=parametros.precio
            productoValidar.cantidad=parametros.cantidad
            productoValidar.fechaInicio=parametros.fechaInicio
            productoValidar.fechaFin=parametros.fechaFin
            productoValidar.categoria=parametros.categoria
            productoValidar.id=Number(parametroRuta.id)

            const errores=await validate(productoValidar)
            if(errores.length>0){
                console.log('Errores', errores)
                throw new BadRequestException('Error con class-validator')
            }else{
                producto=productoValidar

            }
        }catch(e){
            throw new BadRequestException('Error con class-validator')
        }

        if(producto){
            try{
                const respuesta=await this._productoService.modificarUnProducto(producto)
                return respuesta
            }catch (e) {
                throw new InternalServerErrorException('Error en el servidor')
            }

        }
    }






}