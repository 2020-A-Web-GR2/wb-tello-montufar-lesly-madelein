import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {ImagenProductoEntity} from "./imagen-producto.entity";
import {ImagenProductoService} from "./imagen-producto.service";
import {ImagenProductoController} from "./imagen-producto.controller";

@Module({
    exports:[ImagenProductoService],
    imports:[
        TypeOrmModule.forFeature(
            [ImagenProductoEntity],
            'default' //nombre de la cadena de conexion
        )],
    providers:[ImagenProductoService],
    controllers:[ImagenProductoController]
})
export class ImagenProductoModule{

}