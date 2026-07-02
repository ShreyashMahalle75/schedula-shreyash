import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class DoctorLeaveService {
  private doctorLeaves: any[] = [];

  // Dummy doctor list (replace with DB later)
  private doctors = [
    { doctorId: 1 },
    { doctorId: 2 },
    { doctorId: 3 },
  ];

  // CREATE LEAVE
  createLeave(body: any) {
    // Doctor Validation
    const doctor = this.doctors.find(
      (d) => d.doctorId === body.doctorId,
    );

    if (!doctor) {
      throw new BadRequestException(
        'Doctor not found.',
      );
    }

    // Date Validation
    const leaveDate = new Date(body.leaveDate);

    if (isNaN(leaveDate.getTime())) {
      throw new BadRequestException(
        'Invalid leave date.',
      );
    }

    // Past Date Validation
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    leaveDate.setHours(0, 0, 0, 0);

    if (leaveDate < today) {
      throw new BadRequestException(
        'Cannot create leave for past date.',
      );
    }

    // Duplicate Leave Validation
    const existingLeave =
      this.doctorLeaves.find(
        (leave) =>
          leave.doctorId === body.doctorId &&
          leave.leaveDate === body.leaveDate,
      );

    if (existingLeave) {
      throw new BadRequestException(
        'Leave already exists for this date.',
      );
    }

    // Create Leave
    const leave = {
      id: this.doctorLeaves.length + 1,
      doctorId: body.doctorId,
      leaveDate: body.leaveDate,
      reason: body.reason || '',
    };

    this.doctorLeaves.push(leave);

    return {
      message: 'Doctor leave created successfully.',
      data: leave,
    };
  }

  // GET ALL LEAVES
  getLeaves() {
    return {
      message:
        'Doctor leaves fetched successfully.',
      data: this.doctorLeaves,
    };
  }

  // UPDATE LEAVE
  updateLeave(id: number, body: any) {
    const leave = this.doctorLeaves.find(
      (item) => item.id === id,
    );

    if (!leave) {
      throw new BadRequestException(
        'Doctor leave not found.',
      );
    }

    if (body.leaveDate) {
      leave.leaveDate = body.leaveDate;
    }

    if (body.reason) {
      leave.reason = body.reason;
    }

    return {
      message: 'Doctor leave updated successfully.',
      data: leave,
    };
  }

  // DELETE LEAVE
  deleteLeave(id: number) {
    const index = this.doctorLeaves.findIndex(
      (item) => item.id === id,
    );

    if (index === -1) {
      throw new BadRequestException(
        'Doctor leave not found.',
      );
    }

    this.doctorLeaves.splice(index, 1);

    return {
      message: 'Doctor leave deleted successfully.',
    };
  }

isDoctorOnLeave(
  doctorId: number,
  leaveDate: string,
) {
  return this.doctorLeaves.find(
    (leave) =>
      leave.doctorId === doctorId &&
      leave.leaveDate === leaveDate,
  );
}


}