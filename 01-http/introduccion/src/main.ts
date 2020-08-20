import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //En TS
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser= require('cookie-parser'); //Importar cosas en JS
const express=require('express');
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  /*
  * AQUI CONFIGURACION
  * *
   */
  app.use(cookieParser('Me gusta las poliburguers'))
  app.set('view engine','ejs')
  app.use(express.static('publico'))

  await app.listen(3001);
}
bootstrap();


