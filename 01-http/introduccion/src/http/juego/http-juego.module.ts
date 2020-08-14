import {Module} from "@nestjs/common";
import {HttpJuegoController} from "./http-juego.controller";


@Module({
        imports:[],
        providers:[],
        controllers:[
            HttpJuegoController
        ]
    })

export class HttpJuegoModule{
}