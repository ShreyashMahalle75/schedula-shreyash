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
    return this.appointmentService.bookAppointment(body);
  }

@Get('my')
getMyAppointments() {
return this.appointmentService.getMyAppointments();
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

  // Reschedule Appointment
  @Patch(':id/reschedule')
  rescheduleAppointment(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.appointmentService.rescheduleAppointment(
      Number(id),
      body,
    );
  }
}