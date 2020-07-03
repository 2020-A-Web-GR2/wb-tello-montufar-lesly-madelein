import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";

@Module({
  imports: [
      //aquí otros modulos
      HttpJuegoModule
  ],
  controllers: [
      //Controladores del app module
    AppController],
  providers: [
      //Servicios del app module
      AppService],
})
export class AppModule {}
