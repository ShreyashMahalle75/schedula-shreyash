import { Test, TestingModule } from '@nestjs/testing';
import { NextAppointmentController } from './next-appointment.controller';

describe('NextAppointmentController', () => {
  let controller: NextAppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NextAppointmentController],
    }).compile();

    controller = module.get<NextAppointmentController>(NextAppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
