import {Module} from "@nestjs/common";
import {HttpJuegoController} from "../juego/http-juego.controller";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {MascotaService} from "../mascota/mascota.service";
import {MascotaModule} from "../mascota/mascota.module";

@Module({
    imports:[
        MascotaModule,
        TypeOrmModule.forFeature(
            [
                UsuarioEntity
            ],
            'default' //nombre de la cadena de conexion

        ),


    ],
    providers:[UsuarioService],
    controllers:[UsuarioController

    ]
})

export class UsuarioModule{

}
