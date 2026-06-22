import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { NextAppointmentService } from './next-appointment.service';

@Controller('next-appointment')
export class NextAppointmentController {
  constructor(
    private readonly nextAppointmentService: NextAppointmentService,
  ) {}

  @Get(':doctorId')
  findNextAvailableSlot(
    @Param('doctorId', ParseIntPipe)
    doctorId: number,

    @Query('type')
    type: string,
  ) {
    return this.nextAppointmentService.findNextAvailableSlot(
      doctorId,
      type,
    );
  }
}