import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/juego/http-juego.module";
import {CalculadoraModule} from "./http/deber1/calculadora.module";
import {UsuarioModule} from "./http/usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./http/usuario/usuario.entity";
import {MascotaEntity} from "./http/mascota/mascota.entity";
import {VacunaEntity} from "./http/vacuna/vacuna.entity";
import {MascotaModule} from "./http/mascota/mascota.module";
import {VacunaModule} from "./http/vacuna/vacuna.module";

@Module({
  imports: [
      //aquí otros modulos
      HttpJuegoModule,
      CalculadoraModule,
      UsuarioModule,
      MascotaModule,
      VacunaModule,

      TypeOrmModule.forRoot({
          name:'default',//nombre de conexion
          type: 'mysql',//mysql, postgres, etc
          host: 'localhost', //IP
          port: 3306, //puerto
          username: 'root', //usuario
          password: 'adminWEB98', //password
          database: 'test', //base de datos
          entities: [ //TODAS LAS ENTIDADES
              UsuarioEntity,
              MascotaEntity,
              VacunaEntity
          ],
          synchronize: true,// Actualiza el estado de la base de datos
          dropSchema:false //Eliminar los datos y el esquema de base de datos
      }),
  ],
  controllers: [
      //Controladores del app module
    AppController],
  providers: [
      //Servicios del app module
      AppService],
})
export class AppModule {}
