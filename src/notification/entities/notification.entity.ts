import { NotificationType } from '../enums/notification-type.enum';

export class Notification {
  id!: number;

  patientId!: number;

  title!: string;

  message!: string;

  type!: NotificationType;

  isRead!: boolean;

  createdAt!: Date;
}