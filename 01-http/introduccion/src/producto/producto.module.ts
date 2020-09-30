import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductoEntity} from "./producto.entity";
import {ProductoController} from "./producto.controller";
import {ProductoService} from "./producto.service";
import {CategoriaModule} from "../categoria/categoria.module";
import {ImagenProductoModule} from "../imagen-producto/imagen-producto.module";


@Module({
    imports:[
        CategoriaModule,
        ImagenProductoModule,
        TypeOrmModule.forFeature(
            [ProductoEntity],
            'default' //nombre de la cadena de conexion
        )],
    providers:[ProductoService],
    controllers:[ProductoController]
})
export class ProductoModule{

}