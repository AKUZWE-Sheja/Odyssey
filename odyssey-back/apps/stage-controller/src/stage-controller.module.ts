import { Module } from '@nestjs/common';
import { StageControllerController } from './stage-controller.controller';
import { StageControllerService } from './stage-controller.service';

@Module({
  imports: [],
  controllers: [StageControllerController],
  providers: [StageControllerService],
})
export class StageControllerModule {}
