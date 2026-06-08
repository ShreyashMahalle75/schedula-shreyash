import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';

import { User } from './users/user.entity';
import { DoctorProfile } from './doctor/doctor-profile.entity';
import { PatientProfile } from './patient/patient-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Postgres@123',
      database: 'schedula_db',

      entities: [
        User,
        DoctorProfile,
        PatientProfile,
      ],

      synchronize: false,
    }),

    AuthModule,
    UsersModule,
    DoctorModule,
    PatientModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}