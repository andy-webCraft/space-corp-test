import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const host = process.env.SERVER_HOST || 'http://localhost';
  const port = process.env.SERVER_PORT || 5001;
  const serverURL = `${host}:${port}`;

  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SpaceCorp Test')
    .setDescription('RESTful API documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: `Test token: ${process.env.TEST_ACCESS_TOKEN}`,
    })
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDoc);

  await app.listen(port);

  console.info(`
  ************************************************
  ✅ Server successfully started on port: ${port}
  🌐 Server URL: ${serverURL}
  📜 API Doc: ${serverURL}/api
  ************************************************
  `);
}

bootstrap();
