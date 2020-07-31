import {Module} from "@nestjs/common";
import {HttpJuegoController} from "../http-juego.controller";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                UsuarioEntity
            ],
            'default' //nombre de la cadena de conexion

        )

    ],
    providers:[UsuarioService],
    controllers:[UsuarioController

    ]
})

export class UsuarioModule{

}
