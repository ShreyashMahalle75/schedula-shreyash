import { Injectable } from '@nestjs/common';

@Injectable()
export class AvailabilityService {
  private availabilities: any[] = [];
  private overrides: any[] = [];

  createAvailability(body: any) {

    if (body.startTime >= body.endTime) {
      return {
        message: 'End time must be after start time',
      };
    }

    const exists = this.availabilities.find(
      (item) =>
        item.dayOfWeek === body.dayOfWeek &&
        item.startTime === body.startTime &&
        item.endTime === body.endTime,
    );

    if (exists) {
      return {
        message: 'Duplicate availability slot',
      };
    }
     const overlap = this.availabilities.find(
    (item) =>
      item.dayOfWeek === body.dayOfWeek &&
      body.startTime < item.endTime &&
      body.endTime > item.startTime,
  );

  if (overlap) {
    return {
      message: 'Overlapping slot detected',
    };
  }

    this.availabilities.push(body);

    return {
      message: 'Availability created',
      data: body,
    };
  }

  getAvailability() {
    return {
      message: 'Availability list',
      data: this.availabilities,
    };
  }

  updateAvailability(id: number, body: any) {
    this.availabilities[id] = {
      ...this.availabilities[id],
      ...body,
    };

    return {
      message: 'Availability updated',
      data: this.availabilities[id],
    };
  }

  deleteAvailability(id: number) {
    this.availabilities.splice(id, 1);

    return {
      message: 'Availability deleted',
    };
  }

  createOverride(body: any) {
    this.overrides.push(body);

    return {
      message: 'Override created',
      data: body,
    };
  }

  getOverrideByDate(date: string) {
    const result = this.overrides.filter(
      (item) => item.date === date,
    );

    return {
      message: 'Override Availability',
      data: result,
    };
  }
}