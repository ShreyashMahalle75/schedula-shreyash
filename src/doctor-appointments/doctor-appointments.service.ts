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
      (appointment) => appointment.status !== 'CANCELLED',
    );

    if (date) {
      data = data.filter(
        (appointment) => appointment.date === date,
      );
    }

    if (data.length === 0) {
      return {
        success: false,
        message: 'No appointments found',
      };
    }

    return {
      success: true,
      message: 'Appointments fetched successfully',
      data,
    };
  }

  cancelAppointment(id: number) {
    const appointment = this.appointments.find(
      (appointment) => appointment.id === id,
    );

    if (!appointment) {
      return {
        success: false,
        message: 'Appointment not found',
      };
    }

    if (appointment.status === 'CANCELLED') {
      return {
        success: false,
        message: 'Appointment already cancelled',
      };
    }

    appointment.status = 'CANCELLED';

    return {
      success: true,
      message: 'Appointment cancelled successfully',
      data: appointment,
    };
  }
}