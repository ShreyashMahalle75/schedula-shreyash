import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DoctorProfile } from './doctor-profile.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorProfile)
    private doctorRepository: Repository<DoctorProfile>,
  ) {}

  async create(data: any) {
    const existingProfile =
      await this.doctorRepository.findOne({
        where: {
          fullName: data.fullName,
        },
      });

    if (existingProfile) {
      return {
        message:
          'Doctor profile already exists',
      };
    }

    const profile =
      this.doctorRepository.create(data);

    const savedProfile =
      await this.doctorRepository.save(
        profile,
      );

    return {
      message: 'Doctor profile created',
      data: savedProfile,
    };
  }

  async findOne() {
    const profiles =
      await this.doctorRepository.find();

    if (profiles.length === 0) {
      throw new NotFoundException(
        'Doctor profile not found',
      );
    }

    return {
      message: 'Doctor Profile',
      data: profiles,
    };
  }

  async update(data: any) {
    const profile =
      await this.doctorRepository.findOne({
        where: {
          id: 1,
        },
      });

    if (!profile) {
      throw new NotFoundException(
        'Doctor profile not found',
      );
    }

    Object.assign(profile, data);

    const updatedProfile =
      await this.doctorRepository.save(
        profile,
      );

    return {
      message: 'Doctor profile updated',
      data: updatedProfile,
    };
  }
}