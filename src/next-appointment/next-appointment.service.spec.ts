import { Test, TestingModule } from '@nestjs/testing';
import { NextAppointmentService } from './next-appointment.service';

describe('NextAppointmentService', () => {
  let service: NextAppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NextAppointmentService],
    }).compile();

    service = module.get<NextAppointmentService>(NextAppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
