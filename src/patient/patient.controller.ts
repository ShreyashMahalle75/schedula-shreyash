import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('patient')
export class PatientController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getPatientProfile() {
    return {
      message: 'Patient Profile',
    };
  }
}