import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //En TS
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser= require('cookie-parser'); //Importar cosas en JS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  * AQUI CONFIGURACION
  * *
   */
  app.use(cookieParser('Me gusta las poliburguers'))

  await app.listen(3001);
}
bootstrap();


