import { Test, TestingModule } from '@nestjs/testing';
import { StageControllerController } from './stage-controller.controller';
import { StageControllerService } from './stage-controller.service';

describe('StageControllerController', () => {
  let stageControllerController: StageControllerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StageControllerController],
      providers: [StageControllerService],
    }).compile();

    stageControllerController = app.get<StageControllerController>(StageControllerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(stageControllerController.getHello()).toBe('Hello World!');
    });
  });
});
