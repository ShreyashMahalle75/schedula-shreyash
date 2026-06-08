import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorController } from './doctor.controller';
import { DoctorProfile } from './doctor-profile.entity';
import { DoctorService } from './doctor.service';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorProfile]),
    JwtModule.register({
      secret: 'schedula-secret-key',
    }),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}