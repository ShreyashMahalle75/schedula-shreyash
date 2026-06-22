import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAppointmentsController } from './doctor-appointments.controller';

describe('DoctorAppointmentsController', () => {
  let controller: DoctorAppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorAppointmentsController],
    }).compile();

    controller = module.get<DoctorAppointmentsController>(DoctorAppointmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
