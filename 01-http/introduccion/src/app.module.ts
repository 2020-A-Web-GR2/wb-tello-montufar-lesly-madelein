import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {CalculadoraModule} from "./http/deber1/calculadora.module";
import {UsuarioModule} from "./http/usuario/usuario.module";

@Module({
  imports: [
      //aquí otros modulos
      HttpJuegoModule,
      CalculadoraModule,
      UsuarioModule
  ],
  controllers: [
      //Controladores del app module
    AppController],
  providers: [
      //Servicios del app module
      AppService],
})
export class AppModule {}
