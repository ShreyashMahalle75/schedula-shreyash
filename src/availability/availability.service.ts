import { Injectable } from '@nestjs/common';

@Injectable()
export class AvailabilityService {
  private availabilities: any[] = [];
  private overrides: any[] = [];

  createAvailability(body: any) {
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

  resolveAvailability(date: string) {
    const override = this.overrides.find(
      (item) => item.date === date,
    );

    if (override) {
      return {
        source: 'override',
        data: override,
      };
    }

    return {
      source: 'recurring',
      data: this.availabilities[0] || null,
    };
  }
}