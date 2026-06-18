import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentService {
  private appointments: any[] = [];

  bookAppointment(body: any) {
    const selectedDate = new Date(body.date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return {
        message: 'Past appointment booking not allowed',
      };
    }

    if (body.doctorId <= 0) {
      return {
        message: 'Doctor not found',
      };
    }

    if (!body.startTime || !body.endTime) {
      return {
        message: 'Invalid slot',
      };
    }

    const existingAppointment = this.appointments.find(
      (appointment) =>
        appointment.doctorId === body.doctorId &&
        appointment.date === body.date &&
        appointment.startTime === body.startTime &&
        appointment.status === 'BOOKED',
    );

    if (existingAppointment) {
      return {
        message: 'Slot already booked',
      };
    }

    const appointment = {
      id: this.appointments.length + 1,
      ...body,
      status: 'BOOKED',
    };

    this.appointments.push(appointment);

    return {
      message: 'Appointment booked successfully',
      data: appointment,
    };
  }

  getMyAppointments() {
    if (this.appointments.length === 0) {
      return {
        message: 'No appointments found',
      };
    }

    return {
      message: 'Patient appointments',
      data: this.appointments,
    };
  }

  getDoctorAppointments() {
    if (this.appointments.length === 0) {
      return {
        message: 'No appointments found',
      };
    }

    return {
      message: 'Doctor appointments',
      data: this.appointments,
    };
  }

  cancelAppointment(id: number) {
    const appointment = this.appointments.find(
      (item) => item.id === id,
    );

    if (!appointment) {
      return {
        message: 'Invalid appointment ID',
      };
    }

    if (appointment.status === 'CANCELLED') {
      return {
        message: 'Appointment already cancelled',
      };
    }

    appointment.status = 'CANCELLED';

    return {
      message: 'Appointment cancelled successfully',
      data: appointment,
    };
  }

  rescheduleAppointment(id: number, body: any) {
    const appointment = this.appointments.find(
      (item) => item.id === id,
    );

    if (!appointment) {
      return {
        message: 'Appointment not found',
      };
    }

    if (appointment.status === 'CANCELLED') {
      return {
        message: 'Cannot reschedule cancelled appointment',
      };
    }

    if (appointment.patientId !== body.patientId) {
      return {
        message: 'Unauthorized rescheduling',
      };
    }

    if (
      appointment.date === body.newDate &&
      appointment.startTime === body.newStartTime
    ) {
      return {
        message: 'Cannot reschedule to same slot',
      };
    }

    const existingAppointment = this.appointments.find(
      (item) =>
        item.id !== id &&
        item.doctorId === appointment.doctorId &&
        item.date === body.newDate &&
        item.startTime === body.newStartTime &&
        item.status === 'BOOKED',
    );

    if (existingAppointment) {
      return {
        message: 'Requested slot unavailable. Suggest next available slot',
      };
    }

    appointment.date = body.newDate;
    appointment.startTime = body.newStartTime;

    return {
      message: 'Appointment rescheduled successfully',
      data: appointment,
    };
  }
}