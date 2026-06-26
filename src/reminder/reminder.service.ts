import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { AppointmentService } from '../appointment/appointment.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../notification/enums/notification-type.enum';

@Injectable()
export class ReminderService {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly notificationService: NotificationService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  handleAppointmentReminders() {
    console.log('Running Appointment Reminder Job...');

    const appointments =
      this.appointmentService.getAppointments();

    console.log(appointments);

    appointments.forEach((appointment) => {
      // Skip cancelled, completed, or already reminded appointments
      if (
        appointment.status === 'CANCELLED' ||
        appointment.status === 'COMPLETED' ||
        appointment.reminderSent
      ) {
        return;
      }

      // Check only today's appointments
      const today = new Date()
        .toISOString()
        .split('T')[0];

      if (appointment.date !== today) {
        return;
      }

      // Stream Scheduling Reminder
      if (appointment.schedulingType === 'STREAM') {
        this.notificationService.create(
          appointment.patientId,
          'Appointment Reminder',
          `Reminder: You have an appointment with Doctor ${appointment.doctorId} today at ${appointment.startTime}.`,
          NotificationType.APPOINTMENT_REMINDER,
        );
      }

      // Wave Scheduling Reminder
      if (appointment.schedulingType === 'WAVE') {
        this.notificationService.create(
          appointment.patientId,
          'Appointment Reminder',
          `Reminder: You have an appointment with Doctor ${appointment.doctorId} today.

Reporting Time: ${appointment.startTime}
Token Number: ${appointment.tokenNumber}`,
          NotificationType.APPOINTMENT_REMINDER,
        );
      }

      // Prevent duplicate reminders
      appointment.reminderSent = true;

      console.log(
        `Reminder sent for appointment ${appointment.id}`,
      );
    });
  }
}