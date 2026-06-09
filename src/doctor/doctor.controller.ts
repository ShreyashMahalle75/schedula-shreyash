import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
  ) {}

  // DAY 4 API - Get Doctors List
  @Get()
  getDoctors(
    @Query('specialization')
    specialization?: string,

    @Query('search')
    search?: string,

    @Query('page')
    page?: number,

    @Query('limit')
    limit?: number,

    @Query('availability')
    availability?: string,
  ) {
    return this.doctorService.findAll(
      specialization,
      search,
      Number(page) || 1,
      Number(limit) || 10,
      availability,
    );
  }

  // DAY 4 API - Get Doctor By ID
  @Get(':id')
  getDoctorById(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.doctorService.findDoctorById(
      id,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Post('profile')
  createProfile(
    @Body() createDoctorDto: CreateDoctorDto,
  ) {
    return this.doctorService.create(
      createDoctorDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Get('profile')
  getProfile() {
    return this.doctorService.findOne();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Patch('profile')
  updateProfile(
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return this.doctorService.update(
      updateDoctorDto,
    );
  }
}