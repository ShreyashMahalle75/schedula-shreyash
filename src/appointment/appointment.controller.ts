
import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
} from '@nestjs/common';

import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
  ) {}

  // Book Appointment
  @Post()
  bookAppointment(@Body() body: any) {
    return this.appointmentService.bookAppointment(
      body,
    );
  }

  // Patient Appointments
  @Get('my')
  getPatientAppointments() {
    return this.appointmentService.getPatientAppointments();
  }

  // Doctor Appointments
  @Get('doctor')
  getDoctorAppointments() {
    return this.appointmentService.getDoctorAppointments();
  }

  // Cancel Appointment
  @Patch(':id/cancel')
  cancelAppointment(
    @Param('id') id: string,
  ) {
    return this.appointmentService.cancelAppointment(
      Number(id),
    );
  }
}