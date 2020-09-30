import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoriaController} from "./categoria.controller";
import {CategoriaService} from "./categoria.service";
import {Module} from "@nestjs/common";
import {CategoriaEntity} from "./category.entity";

@Module({
    imports:[TypeOrmModule.forFeature(
        [CategoriaEntity],
        'default')],
    providers:[CategoriaService],
    controllers:[CategoriaController],
    exports:[CategoriaService]
})
export class CategoriaModule{

}