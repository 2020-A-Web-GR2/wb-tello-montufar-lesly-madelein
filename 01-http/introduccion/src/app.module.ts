import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {CalculadoraModule} from "./http/deber1/calculadora.module";
import {UsuarioModule} from "./http/usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./http/usuario/usuario.entity";

@Module({
  imports: [
      //aquí otros modulos
      HttpJuegoModule,
      CalculadoraModule,
      UsuarioModule,
      TypeOrmModule.forRoot({
          name:'default',//nombre de conexion
          type: 'mysql',//mysql, postgres
          host: 'localhost', //IP
          port: 3306, //puerto
          username: 'root', //usuario
          password: 'adminWEB98', //pasword
          database: 'test', //base de datos
          entities: [ //TODAS LAS ENTIDADES
              UsuarioEntity
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
