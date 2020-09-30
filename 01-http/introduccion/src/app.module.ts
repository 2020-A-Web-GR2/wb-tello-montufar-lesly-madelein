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
import {ZoologicoEntity} from "./http/examenFinal/zoologico.entity";
import {ModuloZoologico} from "./http/examenFinal/zoologico.module";
import {ProductoModule} from "./producto/producto.module";
import {CategoriaModule} from "./categoria/categoria.module";
import {ImagenProductoModule} from "./imagen-producto/imagen-producto.module";
import {CategoriaEntity} from "./categoria/category.entity";
import {ProductoEntity} from "./producto/producto.entity";
import {ImagenProductoEntity} from "./imagen-producto/imagen-producto.entity";

@Module({
  imports: [
      //aquí otros modulos
      HttpJuegoModule,
      CalculadoraModule,
      UsuarioModule,
      MascotaModule,
      VacunaModule,
      ModuloZoologico,
      ProductoModule,
      CategoriaModule,
      ImagenProductoModule,

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
              VacunaEntity,
              ZoologicoEntity,
              CategoriaEntity,
              ProductoEntity,
              ImagenProductoEntity
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
