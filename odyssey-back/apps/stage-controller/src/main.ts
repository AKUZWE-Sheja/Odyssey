import { NestFactory } from '@nestjs/core';
import { StageControllerModule } from './stage-controller.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(StageControllerModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 8888, // The internal "backstage" port
    },
  });
  await app.listen();
  console.log('Stage Controller Microservice is listening...');
}
bootstrap();