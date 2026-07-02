import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../notification/enums/notification-type.enum';
import { DoctorLeaveService } from '../doctor-leave/doctor-leave.service';

@Injectable()
export class AppointmentService {
  private appointments: any[] = [];
  private doctorSchedules = [
  {
    doctorId: 1,
    consultationStart: '13:00',
consultationEnd: '18:00',
    // Day 20 Configuration
    allowFutureBooking: false,
    maxFutureBookingDays: null,
  },
  {
    doctorId: 2,
    consultationStart: '14:00',
    consultationEnd: '18:00',

    // Day 20 Configuration
    allowFutureBooking: true,
    maxFutureBookingDays: 5,
  },
  {
    doctorId: 3,
    consultationStart: '08:00',
    consultationEnd: '13:00',

    // Default 7 Days
    allowFutureBooking: true,
    maxFutureBookingDays: null,
  },
];

  
  

  constructor(
  private readonly notificationService: NotificationService,
  private readonly doctorLeaveService: DoctorLeaveService,
) {}

  // Reusable Booking Window Calculator
  private calculateBookingWindow(
    consultationStart: string,
    consultationEnd: string,
  ) {
    const [startHour, startMinute] =
      consultationStart.split(':').map(Number);

    const [endHour, endMinute] =
      consultationEnd.split(':').map(Number);

    // Booking opens 2 hours before consultation starts
    const bookingOpen = new Date();

    bookingOpen.setHours(
      startHour - 2,
      startMinute,
      0,
      0,
    );

    // Booking closes 1 hour before consultation ends
    const bookingClose = new Date();

    bookingClose.setHours(
      endHour - 1,
      endMinute,
      0,
      0,
    );

    return {
      bookingOpen,
      bookingClose,
    };
  }

  // BOOK APPOINTMENT
  bookAppointment(body: any) {
    // ======================
    // DAY 17 VALIDATIONS
    // ======================

    const bookingDate = new Date(body.date);

    // Invalid Date Format
    if (isNaN(bookingDate.getTime())) {
      throw new BadRequestException(
        'Invalid date format. Please provide a valid date.',
      );
    }

    // Today Only Validation
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    bookingDate.setHours(0, 0, 0, 0);
    // ======================
// DAY 21 VALIDATION
// DOCTOR LEAVE CHECK
// ======================

const doctorOnLeave =
  this.doctorLeaveService.isDoctorOnLeave(
    body.doctorId,
    body.date,
  );

if (doctorOnLeave) {
  throw new BadRequestException(
    'Doctor is unavailable on this date. Please select another available date.',
  );
}

   // ======================
// DAY 20 VALIDATIONS
// ======================

// Past Date Validation
if (bookingDate < today) {
  throw new BadRequestException(
    'Booking for past dates is not allowed.',
  );
}

// Doctor Validation
if (!body.doctorId) {
  throw new BadRequestException(
    'Invalid doctor selected.',
  );
}

// Find Doctor Schedule
const doctorSchedule =
  this.doctorSchedules.find(
    (doctor) =>
      doctor.doctorId === body.doctorId,
  );

// Doctor Not Found
if (!doctorSchedule) {
  throw new BadRequestException(
    'Doctor not found.',
  );
}

// Invalid Configuration
if (
  doctorSchedule.maxFutureBookingDays !== null &&
  doctorSchedule.maxFutureBookingDays < 0
) {
  throw new BadRequestException(
    'Invalid doctor availability configuration.',
  );
}

// Future Booking Disabled
if (!doctorSchedule.allowFutureBooking) {
  if (bookingDate.getTime() !== today.getTime()) {
    throw new BadRequestException(
      'This doctor accepts only today appointments.',
    );
  }
}

// Future Booking Enabled
if (doctorSchedule.allowFutureBooking) {
  const maxFutureDays =
    doctorSchedule.maxFutureBookingDays ?? 7;

  const maxAllowedDate = new Date(today);

  maxAllowedDate.setDate(
    today.getDate() + maxFutureDays,
  );

  if (bookingDate > maxAllowedDate) {
    throw new BadRequestException(
      `Booking allowed only within ${maxFutureDays} future days.`,
    );
  }
}
   

   // Invalid consultation timings
if (
  !doctorSchedule.consultationStart ||
  !doctorSchedule.consultationEnd
) {
  throw new BadRequestException(
    'Invalid consultation timings.',
  );
}

    // Invalid consultation timings
    if (
      !doctorSchedule.consultationStart ||
      !doctorSchedule.consultationEnd
    ) {
      throw new BadRequestException(
        'Invalid consultation timings.',
      );
    }

    // Calculate Booking Window
    const {
      bookingOpen,
      bookingClose,
    } = this.calculateBookingWindow(
      doctorSchedule.consultationStart,
      doctorSchedule.consultationEnd,
    );

    // Current Time (IST)
    const currentTime = new Date(
      new Date().toLocaleString(
        'en-US',
        {
          timeZone: 'Asia/Kolkata',
        },
      ),
    );

    // Before Opening Time
    if (currentTime < bookingOpen) {
      throw new BadRequestException(
        `Booking has not opened yet. Booking opens at ${bookingOpen.toLocaleTimeString()}.`,
      );
    }

    // After Closing Time
    if (currentTime > bookingClose) {
      throw new BadRequestException(
        `Booking window has closed. Booking closed at ${bookingClose.toLocaleTimeString()}.`,
      );
    }

    // ======================
    // SLOT VALIDATION
    // ======================

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

    // ======================
    // CREATE APPOINTMENT
    // ======================

    const appointment = {
      id: this.appointments.length + 1,
      ...body,
      status: 'BOOKED',
      reminderSent: false,
    };

    this.appointments.push(appointment);

    // Create Notification
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
    const appointment =
      this.appointments.find(
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
  rescheduleAppointment(
    id: number,
    body: any,
  ) {
    const appointment =
      this.appointments.find(
        (item) => item.id === id,
      );

    if (!appointment) {
      throw new BadRequestException(
        'Appointment not found',
      );
    }

    appointment.date = body.newDate;
    appointment.startTime =
      body.newStartTime;

    this.notificationService.create(
      appointment.patientId,
      'Appointment Rescheduled',
      `Your appointment has been rescheduled to ${body.newDate} at ${body.newStartTime}.`,
      NotificationType.APPOINTMENT_RESCHEDULED,
    );

    return {
      message:
        'Appointment rescheduled successfully',
      data: appointment,
    };
  }

  // Used by Reminder Cron Job
  getAppointments() {
    return this.appointments;
  }
}