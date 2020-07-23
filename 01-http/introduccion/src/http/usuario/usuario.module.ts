import {Module} from "@nestjs/common";
import {HttpJuegoController} from "../http-juego.controller";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";

@Module({
    imports:[],
    providers:[],
    controllers:[UsuarioController

    ]
})

export class UsuarioModule{

}