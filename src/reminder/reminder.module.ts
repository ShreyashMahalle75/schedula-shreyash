import { Module } from '@nestjs/common';
import { ReminderService } from './reminder.service';

import { AppointmentModule } from '../appointment/appointment.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    AppointmentModule,
    NotificationModule,
  ],
  providers: [ReminderService],
})
export class ReminderModule {}