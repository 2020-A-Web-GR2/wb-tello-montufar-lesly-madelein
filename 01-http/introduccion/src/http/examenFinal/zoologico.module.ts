import {Module} from "@nestjs/common";
import {ZoologicoService} from "./zoologico.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {ZoologicoEntity} from "./zoologico.entity";
import {ZoologicoController} from "./zoologico.controller";

@Module({
    controllers:[ZoologicoController],
    providers:[ZoologicoService],
    imports:[

        TypeOrmModule.forFeature(
            [
                ZoologicoEntity
            ],
            'default' //nombre de la cadena de conexion

        ),
    ]
})

export class ModuloZoologico {

}