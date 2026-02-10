import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // To allow Next.js frontend to talk to this API
  app.enableCors();
  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`Odyssey Gateway (API) is running on http://localhost:${port}`);
}
bootstrap();
