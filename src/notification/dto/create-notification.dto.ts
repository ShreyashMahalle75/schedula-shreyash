import { NotificationType } from '../enums/notification-type.enum';

export class CreateNotificationDto {
  patientId!: number;

  title!: string;

  message!: string;

  type!: NotificationType;
}