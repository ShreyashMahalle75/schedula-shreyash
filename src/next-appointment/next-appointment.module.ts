import { Module } from '@nestjs/common';
import { NextAppointmentController } from './next-appointment.controller';
import { NextAppointmentService } from './next-appointment.service';

@Module({
  controllers: [NextAppointmentController],
  providers: [NextAppointmentService]
})
export class NextAppointmentModule {}
