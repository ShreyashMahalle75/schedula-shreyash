import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

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
    // =========================
    // DATE VALIDATION
    // =========================

    const bookingDate = new Date(body.date);

    // Invalid Date Format
    if (isNaN(bookingDate.getTime())) {
      throw new BadRequestException(
        'Invalid date format. Please provide a valid date.',
      );
    }

    // Today's Date
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    bookingDate.setHours(0, 0, 0, 0);

    // Past Date Validation
    if (bookingDate < today) {
      throw new BadRequestException(
        'Booking for past dates is not allowed.',
      );
    }

    // Future Date Validation
    if (bookingDate > today) {
      throw new BadRequestException(
        'Booking is allowed only for today.',
      );
    }

    // Doctor Validation
    if (!body.doctorId) {
      throw new BadRequestException(
        'Invalid doctor selected.',
      );
    }

    // Slot Availability Validation
    const existingAppointment =
      this.appointments.find(
        (appointment) =>
          appointment.doctorId === body.doctorId &&
          appointment.date === body.date &&
          appointment.startTime === body.startTime &&
          appointment.status !== 'CANCELLED',
      );

    if (existingAppointment) {
      throw new BadRequestException(
        'Slot already booked.',
      );
    }

    // Create Appointment
    const appointment = {
      id: this.appointments.length + 1,
      ...body,
      status: 'BOOKED',
      reminderSent: false,
    };

    this.appointments.push(appointment);

    // Notification
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

  // GET ALL APPOINTMENTS
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
      throw new BadRequestException(
        'Appointment not found',
      );
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
      throw new BadRequestException(
        'Appointment not found',
      );
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

  // USED BY CRON JOB
  getAppointments() {
    return this.appointments;
  }
}