import { Injectable } from '@nestjs/common';
import { AvailabilityService } from '../availability/availability.service';

@Injectable()
export class SlotsService {
  constructor(
    private readonly availabilityService: AvailabilityService,
  ) {}

  getDoctorSlots(
    doctorId: number,
    date: string,
  ) {
    if (doctorId <= 0) {
      return {
        message: 'Doctor not found',
      };
    }

    if (!date || isNaN(Date.parse(date))) {
      return {
        message: 'Invalid date',
      };
    }

    const selectedDate = new Date(date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return {
        message: 'Past date not allowed',
      };
    }

    // Resolve availability
    const availability =
      this.availabilityService.resolveAvailability(
        date,
      );

    if (!availability.data) {
      return {
        message: 'No availability found',
      };
    }

    const startTime =
      availability.data.startTime;

    const endTime =
      availability.data.endTime;

    const duration = 15;

    const slots: string[] = [];

    const start = new Date(
      `2026-01-01T${startTime}:00`,
    );

    const end = new Date(
      `2026-01-01T${endTime}:00`,
    );

    let current = new Date(start);

    while (current < end) {
      const slotStart =
        current.toTimeString().slice(0, 5);

      current.setMinutes(
        current.getMinutes() + duration,
      );

      if (current <= end) {
        const slotEnd =
          current.toTimeString().slice(0, 5);

        slots.push(
          `${slotStart} - ${slotEnd}`,
        );
      }
    }

    // Simulate booked slot
    const bookedSlots = [
      '10:15 - 10:30',
    ];

    const availableSlots =
      slots.filter(
        (slot) =>
          !bookedSlots.includes(slot),
      );

    return {
      doctorId,
      date,
      source: availability.source,
      availableSlots,
    };
  }
}