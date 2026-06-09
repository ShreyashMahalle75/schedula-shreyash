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

  // DAY 4 API
  async findAll(
    specialization?: string,
    search?: string,
    page = 1,
    limit = 10,
    availability?: string,
  ) {
    const query =
      this.doctorRepository.createQueryBuilder(
        'doctor',
      );

    if (specialization) {
      query.andWhere(
        'LOWER(doctor.specialization) = LOWER(:specialization)',
        { specialization },
      );
    }

    if (search) {
      query.andWhere(
        'LOWER(doctor.fullName) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }

    if (availability) {
      query.andWhere(
        'LOWER(doctor.availability) = LOWER(:availability)',
        { availability },
      );
    }

    if (page < 1 || limit < 1) {
      return {
        statusCode: 400,
        message:
          'Invalid pagination values',
      };
    }

    query.skip((page - 1) * limit);
    query.take(limit);

    const doctors =
      await query.getMany();

    if (doctors.length === 0) {
      return {
        message: 'No doctors found',
        data: [],
      };
    }

    return {
      page,
      limit,
      total: doctors.length,
      data: doctors,
    };
  }

  // DAY 4 API
  async findDoctorById(id: number) {
    const doctor =
      await this.doctorRepository.findOne({
        where: { id },
      });

    if (!doctor) {
      throw new NotFoundException(
        'Doctor not found',
      );
    }

    return {
      message: 'Doctor Details',
      data: doctor,
    };
  }
}