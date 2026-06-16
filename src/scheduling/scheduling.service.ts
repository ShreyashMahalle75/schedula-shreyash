
import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class SchedulingService {
  private schedules: any[] = [];

  createSchedule(body: any) {
    // Scheduling Type Validation
    if (
      body.schedulingType !== 'STREAM' &&
      body.schedulingType !== 'WAVE'
    ) {
      throw new BadRequestException(
        'Invalid scheduling type',
      );
    }

    // STREAM Scheduling
    if (body.schedulingType === 'STREAM') {
      if (!body.slotDuration || body.slotDuration <= 0) {
        throw new BadRequestException(
          'Invalid slot duration',
        );
      }

      if (body.bufferTime < 0) {
        throw new BadRequestException(
          'Invalid buffer time',
        );
      }

      const slots: string[] = [];

      let currentHour = 10;
      let currentMinute = 0;

      while (currentHour < 11) {
        const start = `${String(currentHour).padStart(
          2,
          '0',
        )}:${String(currentMinute).padStart(2, '0')}`;

        currentMinute += body.slotDuration;

        let endHour = currentHour;
        let endMinute = currentMinute;

        if (endMinute >= 60) {
          endHour++;
          endMinute -= 60;
        }

        const end = `${String(endHour).padStart(
          2,
          '0',
        )}:${String(endMinute).padStart(2, '0')}`;

        slots.push(`${start} - ${end}`);

        currentMinute += body.bufferTime;

        if (currentMinute >= 60) {
          currentHour++;
          currentMinute -= 60;
        }
      }

      body.generatedSlots = slots;
    }

    // WAVE Scheduling
    if (body.schedulingType === 'WAVE') {
      if (!body.capacity || body.capacity <= 0) {
        throw new BadRequestException(
          'Invalid capacity',
        );
      }

      body.available = body.capacity;
      body.booked = 0;
    }

    this.schedules.push(body);

    return {
      message: 'Schedule created',
      data: body,
    };
  }

  getSchedules() {
    return {
      message: 'Schedules fetched',
      data: this.schedules,
      total: this.schedules.length,
    };
  }

  bookWaveAppointment(body: any) {
    const schedule = this.schedules.find(
      (schedule) =>
        schedule.doctorId === body.doctorId &&
        schedule.schedulingType === 'WAVE',
    );

    if (!schedule) {
      throw new BadRequestException(
        'Wave schedule not found',
      );
    }

    if (schedule.booked >= schedule.capacity) {
      throw new BadRequestException(
        'Wave is full',
      );
    }

    schedule.booked += 1;
    schedule.available -= 1;

    return {
      message: 'Appointment booked',
      tokenNumber: schedule.booked,
      window: `${schedule.startTime} - ${schedule.endTime}`,
      available: schedule.available,
    };
  }
}