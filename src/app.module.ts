import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

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