import { Module } from '@nestjs/common';
import { DoctorAppointmentsController } from './doctor-appointments.controller';
import { DoctorAppointmentsService } from './doctor-appointments.service';

@Module({
  controllers: [DoctorAppointmentsController],
  providers: [DoctorAppointmentsService]
})
export class DoctorAppointmentsModule {}
