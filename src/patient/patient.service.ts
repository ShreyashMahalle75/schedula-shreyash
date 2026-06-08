import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PatientProfile } from './patient-profile.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientProfile)
    private readonly patientRepository: Repository<PatientProfile>,
  ) {}

  async create(data: any) {
    const existingProfile =
      await this.patientRepository.findOne({
        where: {
          contactDetails: data.contactDetails,
        },
      });

    if (existingProfile) {
      return {
        message:
          'Patient profile already exists',
      };
    }

    const profile =
      this.patientRepository.create(data);

    const savedProfile =
      await this.patientRepository.save(
        profile,
      );

    return {
      message: 'Patient profile created',
      data: savedProfile,
    };
  }

  async findOne() {
    const profile =
      await this.patientRepository.find();


       if (profile.length === 0) {
    return {
      message:
        'Patient profile not found',
    };
  }

    return {
      message: 'Patient Profile',
      data: profile,
    };
  }

  async update(data: any) {
  const profile =
    await this.patientRepository.findOne({
      where: {
        id: 1,
      },
    });

  if (!profile) {
    return {
      message:
        'Patient profile not found',
    };
  }

  Object.assign(profile, data);

  const updatedProfile =
    await this.patientRepository.save(
      profile,
    );

  return {
    message:
      'Patient profile updated',
    data: updatedProfile,
  };
}}