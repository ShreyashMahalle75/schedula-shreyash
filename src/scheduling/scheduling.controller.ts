import { Controller, Post, Get, Body } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';

@Controller('scheduling')
export class SchedulingController {
  constructor(
    private readonly schedulingService: SchedulingService,
  ) {}

  @Post()
  createSchedule(@Body() body: any) {
    return this.schedulingService.createSchedule(body);
  }

  @Get()
  getSchedules() {
    return this.schedulingService.getSchedules();
  }

  @Post('book-wave')
  bookWaveAppointment(@Body() body: any) {
    return this.schedulingService.bookWaveAppointment(body);
  }
}