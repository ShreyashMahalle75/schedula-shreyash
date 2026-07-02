import { Module } from '@nestjs/common';

import { DoctorLeaveController } from './doctor-leave.controller';
import { DoctorLeaveService } from './doctor-leave.service';

@Module({
  controllers: [DoctorLeaveController],
  providers: [DoctorLeaveService],
  exports: [DoctorLeaveService],
})
export class DoctorLeaveModule {}