import { UserRole } from '../../users/user.entity';

export class SignupDto {
  name!: string;
  email!: string;
  password!: string;
  role!: UserRole;
}