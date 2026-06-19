import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
} from '@nestjs/common';

import { DoctorAppointmentsService } from './doctor-appointments.service';

@Controller('doctor-management')
export class DoctorAppointmentsController {
  constructor(
    private readonly doctorAppointmentsService: DoctorAppointmentsService,
  ) {}

  @Get()
  getAppointments(
    @Query('date') date?: string,
  ) {
    return this.doctorAppointmentsService.getAppointments(
      date,
    );
  }

  @Patch(':id/cancel')
  cancelAppointment(
    @Param('id') id: string,
  ) {
    return this.doctorAppointmentsService.cancelAppointment(
      Number(id),
    );
  }
}