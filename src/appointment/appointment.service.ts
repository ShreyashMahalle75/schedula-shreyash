import { Injectable } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../notification/enums/notification-type.enum';

@Injectable()
export class AppointmentService {
  private appointments: any[] = [];

  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  // BOOK APPOINTMENT
  bookAppointment(body: any) {
    const appointment = {
      id: this.appointments.length + 1,
      ...body,
      status: 'BOOKED',

      // NEW FIELD FOR DAY 16
      reminderSent: false,
    };

    this.appointments.push(appointment);

    // Existing Notification Logic
    this.notificationService.create(
      body.patientId,
      'Appointment Booked',
      `Your appointment with Doctor ${body.doctorId} has been booked successfully for ${body.date} at ${body.startTime}.`,
      NotificationType.APPOINTMENT_BOOKED,
    );

    return {
      message: 'Appointment booked successfully',
      data: appointment,
    };
  }

  // GET PATIENT APPOINTMENTS
  getMyAppointments() {
    return {
      message: 'Appointments fetched successfully',
      data: this.appointments,
    };
  }

  // GET DOCTOR APPOINTMENTS
  getDoctorAppointments() {
    return {
      message: 'Doctor appointments fetched successfully',
      data: this.appointments,
    };
  }

  // CANCEL APPOINTMENT
  cancelAppointment(id: number) {
    const appointment = this.appointments.find(
      (item) => item.id === id,
    );

    if (!appointment) {
      return {
        message: 'Appointment not found',
      };
    }

    appointment.status = 'CANCELLED';

    this.notificationService.create(
      appointment.patientId,
      'Appointment Cancelled',
      `Your appointment scheduled on ${appointment.date} at ${appointment.startTime} has been cancelled.`,
      NotificationType.APPOINTMENT_CANCELLED,
    );

    return {
      message: 'Appointment cancelled successfully',
      data: appointment,
    };
  }

  // RESCHEDULE APPOINTMENT
  rescheduleAppointment(id: number, body: any) {
    const appointment = this.appointments.find(
      (item) => item.id === id,
    );

    if (!appointment) {
      return {
        message: 'Appointment not found',
      };
    }

    appointment.date = body.newDate;
    appointment.startTime = body.newStartTime;

    this.notificationService.create(
      appointment.patientId,
      'Appointment Rescheduled',
      `Your appointment has been rescheduled to ${body.newDate} at ${body.newStartTime}.`,
      NotificationType.APPOINTMENT_RESCHEDULED,
    );

    return {
      message: 'Appointment rescheduled successfully',
      data: appointment,
    };
  }

  // NEW METHOD FOR CRON JOB
  getAppointments() {
    return this.appointments;
  }
}