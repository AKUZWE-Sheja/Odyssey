import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StageControllerModule } from '../../stage-controller/src/stage-controller.module';

@Module({
  imports: [
    StageControllerModule,
    ClientsModule.register([
      {
        name: 'STAGE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8888,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
