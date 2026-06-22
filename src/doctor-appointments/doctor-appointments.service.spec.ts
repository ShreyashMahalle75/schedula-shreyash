import { Injectable } from '@nestjs/common';

@Injectable()
export class DoctorAppointmentsService {
  private appointments = [
    {
      id: 1,
      doctorId: 1,
      patientId: 1,
      date: '2026-06-25',
      time: '10:00',
      status: 'BOOKED',
      scheduleType: 'STREAM',
    },
  ];

  public getAppointments(date?: string) {
    let data = this.appointments.filter(
      (item) => item.status !== 'CANCELLED',
    );

    if (date) {
      data = data.filter((item) => item.date === date);
    }

    return {
      message:
        data.length > 0
          ? 'Appointments fetched successfully'
          : 'No appointments found',
      data,
    };
  }

  public cancelAppointment(id: number) {
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