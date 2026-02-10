import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { StageControllerService } from './stage-controller.service';

@Controller()
export class StageControllerController {
  constructor(private readonly stageService: StageControllerService) {}

  @MessagePattern({ cmd: 'get_telemetry' })
  getTelemetry() {
    return this.stageService.getStageStatus();
  }

  @MessagePattern({ cmd: 'trigger_start' })
  handleStart() {
    return this.stageService.toggleStart();
  }

  @MessagePattern({ cmd: 'trigger_stop' })
  handleStop() {
    return this.stageService.toggleStop();
  }
}
