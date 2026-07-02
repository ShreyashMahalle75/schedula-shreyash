import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { NotificationModule } from '../notification/notification.module';
import { DoctorLeaveModule } from '../doctor-leave/doctor-leave.module';

@Module({
  imports: [
    NotificationModule,
    DoctorLeaveModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentModule {}