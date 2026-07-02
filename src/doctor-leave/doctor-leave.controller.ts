import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { DoctorLeaveService } from './doctor-leave.service';

@Controller('doctor-leave')
export class DoctorLeaveController {
  constructor(
    private readonly doctorLeaveService: DoctorLeaveService,
  ) {}

  @Post()
  createLeave(@Body() body: any) {
    return this.doctorLeaveService.createLeave(body);
  }

  @Get()
  getLeaves() {
    return this.doctorLeaveService.getLeaves();
  }

  @Patch(':id')
  updateLeave(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.doctorLeaveService.updateLeave(
      Number(id),
      body,
    );
  }

  @Delete(':id')
  deleteLeave(
    @Param('id') id: number,
  ) {
    return this.doctorLeaveService.deleteLeave(
      Number(id),
    );
  }
}