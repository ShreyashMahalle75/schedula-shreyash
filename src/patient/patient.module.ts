import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientController } from './patient.controller';
import { PatientProfile } from './patient-profile.entity';
import { PatientService } from './patient.service';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientProfile]),
    JwtModule.register({
      secret: 'schedula-secret-key',
    }),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}