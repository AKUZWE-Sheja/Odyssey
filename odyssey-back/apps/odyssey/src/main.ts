import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0', // Listening on all interfaces
      port: 8888,
    },
  });

  await app.startAllMicroservices();

  // To allow Next.js frontend to talk to this API
  app.enableCors();
  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`Odyssey Gateway (API) is running on http://localhost:${port}`);
}
bootstrap();
