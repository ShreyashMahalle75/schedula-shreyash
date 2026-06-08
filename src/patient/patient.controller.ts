import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';

import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @Post('profile')
  createProfile(
    @Body() createPatientDto: CreatePatientDto,
  ) {
    return this.patientService.create(
      createPatientDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @Get('profile')
  getPatientProfile() {
    return this.patientService.findOne();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @Patch('profile')
  updateProfile(
     @Body() updatePatientDto: UpdatePatientDto,
) {
  return this.patientService.update(
    updatePatientDto,
  );
}

}