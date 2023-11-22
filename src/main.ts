import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { AppModule } from './app.module'
// import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // ValidationPipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  // Interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  // Filter
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
