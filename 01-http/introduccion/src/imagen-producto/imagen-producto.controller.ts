import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Res
} from "@nestjs/common";
import {ImagenProductoService} from "./imagen-producto.service";
import {ImagenProductoCreateDto} from "./dto/imagen-producto.create.dto";
import {validate} from "class-validator";

@Controller('imagen')
export class ImagenProductoController{

    constructor(
        private readonly _imagenProductoService:ImagenProductoService
    ){

    }

    //Crear una imagen
    @Post()
    async crearImagen(
        @Body() parametrosCuerpo
    ){
        let nuevaImagen
        try {

            const imagenProductoDto = new ImagenProductoCreateDto()
            imagenProductoDto.url = parametrosCuerpo.url
            imagenProductoDto.producto = parametrosCuerpo.producto
            const errores = await validate(imagenProductoDto)
            if (errores.length > 0) {
                console.log(errores)
                throw new BadRequestException('Error en los datos ')
            } else {
                nuevaImagen = imagenProductoDto

            }
        }catch (e) {
            throw new BadRequestException('Error en los datos')
        }

            if(nuevaImagen) {

                try {
                    const respuesta = await this._imagenProductoService.crearImagenProducto(parametrosCuerpo)

                    return respuesta
                } catch (e) {
                    throw new InternalServerErrorException('Error en el servidor')
                }
            }

    }


    //Eliminar una imagen

    @Post('/:id')
    async eliminarImagen(
        @Param() parametroRuta
    ){
        try{
            const respuesta=this._imagenProductoService.eliminarImagenProducto(Number(parametroRuta.id))
            return respuesta
        }catch (e) {
            console.log(e)
            throw new BadRequestException('Error en los datos')
        }
    }

    //mostrar todas las imagenes
    @Get()
    async mostrar(){
        return this._imagenProductoService.buscarTodosImagenProducto()
    }





}