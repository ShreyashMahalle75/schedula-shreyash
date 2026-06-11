import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';

@Controller('doctor/availability')
export class AvailabilityController {
  constructor(
    private readonly availabilityService: AvailabilityService,
  ) {}

  // Create Availability
  @Post()
  createAvailability(@Body() body: any) {
    return this.availabilityService.createAvailability(body);
  }

  // Get All Availability
  @Get()
  getAvailability() {
    return this.availabilityService.getAvailability();
  }

  // Create Override Availability
  @Post('override')
  createOverride(@Body() body: any) {
    return this.availabilityService.createOverride(body);
  }

  // Get Override By Date
  @Get('date')
  getOverrideByDate(
    @Query('date') date: string,
  ) {
    return this.availabilityService.getOverrideByDate(date);
  }

  // Update Availability
  @Patch(':id')
  updateAvailability(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.availabilityService.updateAvailability(
      Number(id),
      body,
    );
  }

  // Delete Availability
  @Delete(':id')
  deleteAvailability(
    @Param('id') id: string,
  ) {
    return this.availabilityService.deleteAvailability(
      Number(id),
    );
  }
}