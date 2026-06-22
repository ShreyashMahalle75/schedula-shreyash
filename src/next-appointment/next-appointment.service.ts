import { Injectable } from '@nestjs/common';

@Injectable()
export class NextAppointmentService {
  private doctors = [
    {
      id: 1,
      weeklyOff: ['Sunday'],
      leaveDates: ['2026-06-28'],
    },
  ];

  private bookedSlots = [
    {
      doctorId: 1,
      date: '2026-06-23',
      slotsBooked: 5,
      maxSlots: 5,
    },
    {
      doctorId: 1,
      date: '2026-06-24',
      slotsBooked: 5,
      maxSlots: 5,
    },
    {
      doctorId: 1,
      date: '2026-06-25',
      slotsBooked: 2,
      maxSlots: 5,
    },
  ];

  findNextAvailableSlot(
    doctorId: number,
    schedulingType: string,
  ) {
    const doctor = this.doctors.find(
      (doctor) => doctor.id === doctorId,
    );

    if (!doctor) {
      return {
        success: false,
        message: 'Doctor not found',
      };
    }

    if (
      schedulingType !== 'STREAM' &&
      schedulingType !== 'WAVE'
    ) {
      return {
        success: false,
        message: 'Invalid scheduling type',
      };
    }

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date();

      currentDate.setDate(
        currentDate.getDate() + i,
      );

      const date = currentDate
        .toISOString()
        .split('T')[0];

      const day = currentDate.toLocaleDateString(
        'en-US',
        { weekday: 'long' },
      );

      if (doctor.weeklyOff.includes(day)) {
        continue;
      }

      if (doctor.leaveDates.includes(date)) {
        continue;
      }

      const booking = this.bookedSlots.find(
        (slot) =>
          slot.doctorId === doctorId &&
          slot.date === date,
      );

      if (
        !booking ||
        booking.slotsBooked < booking.maxSlots
      ) {
        return {
          success: true,
          message:
            'Next available appointment found',

          nextAvailableDate: date,

          schedulingType,

          availableSlots:
            schedulingType === 'STREAM'
              ? ['10:00', '10:30', '11:00']
              : ['Wave 1', 'Wave 2', 'Wave 3'],
        };
      }
    }

    return {
      success: false,
      message:
        'No appointments available in the next 30 working days. Please try again later.',
    };
  }
}