import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule'; // NEW

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AvailabilityModule } from './availability/availability.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { SlotsModule } from './slots/slots.module';
import { AppointmentModule } from './appointment/appointment.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { DoctorAppointmentsModule } from './doctor-appointments/doctor-appointments.module';
import { NextAppointmentModule } from './next-appointment/next-appointment.module';
import { NotificationModule } from './notification/notification.module'; // NEW
import { ReminderModule } from './reminder/reminder.module'; // NEW

import { User } from './users/user.entity';
import { DoctorProfile } from './doctor/doctor-profile.entity';
import { PatientProfile } from './patient/patient-profile.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // NEW: Enables Cron Jobs
    ScheduleModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [
        User,
        DoctorProfile,
        PatientProfile,
      ],
      synchronize: true,
      logging: true,
    }),

    AuthModule,
    UsersModule,
    DoctorModule,
    PatientModule,
    AvailabilityModule,
    SlotsModule,
    AppointmentModule,
    SchedulingModule,
    DoctorAppointmentsModule,
    NextAppointmentModule,

    // NEW MODULES
    NotificationModule,
    ReminderModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}