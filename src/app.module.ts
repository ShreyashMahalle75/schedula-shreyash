import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';

import { User } from './users/user.entity';
import { DoctorProfile } from './doctor/doctor-profile.entity';
import { PatientProfile } from './patient/patient-profile.entity';
console.log('DATABASE_URL =', process.env.DATABASE_URL);
console.log('SYNC = TRUE');
console.log('Entities loaded:', [
  User.name,
  DoctorProfile.name,
  PatientProfile.name,
]);
@Module({
  imports: [
    ConfigModule.forRoot({
  isGlobal: true,
}),
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
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}