import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('doctor')
export class DoctorController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getDoctorProfile() {
    return {
      message: 'Doctor Profile',
    };
  }
}