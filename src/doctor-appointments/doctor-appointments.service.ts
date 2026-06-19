import { Injectable } from '@nestjs/common';

@Injectable()
export class DoctorAppointmentsService {
  private appointments = [
  {
    id: 1,
    doctorId: 1,
    patientName: 'Rahul Sharma',
    date: '2026-06-25',
    time: '10:00',
    status: 'BOOKED',
    scheduleType: 'STREAM',
  },
  {
    id: 2,
    doctorId: 1,
    patientName: 'Priya Patel',
    date: '2026-06-25',
    time: '10:30',
    status: 'BOOKED',
    scheduleType: 'WAVE',
  },
];

  getAppointments(date?: string) {
    let data = this.appointments.filter(
      (item) => item.status !== 'CANCELLED',
    );

    if (date) {
      data = data.filter(
        (item) => item.date === date,
      );
    }

    if (data.length === 0) {
      return {
        message: 'No appointments found',
      };
    }

    return {
      message: 'Appointments fetched successfully',
      data,
    };
  }

  cancelAppointment(id: number) {
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
        message: 'Appointment already cancelled',
      };
    }

    appointment.status = 'CANCELLED';

    return {
      message: 'Appointment cancelled successfully',
      data: appointment,
    };
  }
}