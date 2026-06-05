import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DoctorController } from './doctor.controller';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'schedula-secret-key',
    }),
  ],
  controllers: [DoctorController],
  providers: [JwtAuthGuard, RolesGuard],
})
export class DoctorModule {}