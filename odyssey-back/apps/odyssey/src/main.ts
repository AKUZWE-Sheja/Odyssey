import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // To allow Next.js frontend to talk to this API
  app.enableCors();

  await app.listen(3000);
  console.log('Odyssey Gateway (API) is running on http://localhost:3000');
}
bootstrap();
