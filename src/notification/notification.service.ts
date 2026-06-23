import { Injectable } from '@nestjs/common';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  private notifications: Notification[] = [
    {
      id: 1,
      patientId: 1,
      title: 'Appointment Booked',
      message:
        'Your appointment with Dr. Rahul Sharma is confirmed.',
      type: 'APPOINTMENT_BOOKED' as any,
      isRead: false,
      createdAt: new Date(),
    },

    {
      id: 2,
      patientId: 1,
      title: 'Appointment Reminder',
      message:
        'Reminder: Your appointment is tomorrow at 10:00 AM.',
      type: 'APPOINTMENT_REMINDER' as any,
      isRead: false,
      createdAt: new Date(),
    },
  ];

  createNotification(
    dto: CreateNotificationDto,
  ) {
    const notification: Notification = {
      id: this.notifications.length + 1,
      patientId: dto.patientId,
      title: dto.title,
      message: dto.message,
      type: dto.type,
      isRead: false,
      createdAt: new Date(),
    };

    this.notifications.push(notification);

    return {
      message: 'Notification created successfully',
      data: notification,
    };
  }

  getNotifications(patientId: number) {
    const patientNotifications =
      this.notifications
        .filter(
          (item) =>
            item.patientId === patientId,
        )
        .sort(
          (a, b) =>
            b.createdAt.getTime() -
            a.createdAt.getTime(),
        );

    if (
      patientNotifications.length === 0
    ) {
      return {
        message:
          'No notifications available',
      };
    }

    return {
      message:
        'Notifications fetched successfully',
      data: patientNotifications,
    };
  }

  markAsRead(
    notificationId: number,
    patientId: number,
  ) {
    const notification =
      this.notifications.find(
        (item) =>
          item.id === notificationId,
      );

    if (!notification) {
      return {
        message: 'Notification not found',
      };
    }

    if (
      notification.patientId !==
      patientId
    ) {
      return {
        message:
          'Unauthorized access',
      };
    }

    if (notification.isRead) {
      return {
        message:
          'Notification already marked as read',
      };
    }

    notification.isRead = true;

    return {
      message:
        'Notification marked as read',
      data: notification,
    };
  }

  markAllAsRead(patientId: number) {
    const patientNotifications =
      this.notifications.filter(
        (item) =>
          item.patientId === patientId,
      );

    if (
      patientNotifications.length === 0
    ) {
      return {
        message:
          'No notifications available',
      };
    }

    patientNotifications.forEach(
      (notification) => {
        notification.isRead = true;
      },
    );

    return {
      message:
        'All notifications marked as read',
    };
  }

  getUnreadCount(patientId: number) {
    const unreadCount =
      this.notifications.filter(
        (item) =>
          item.patientId === patientId &&
          !item.isRead,
      ).length;

    return {
      message:
        'Unread count fetched successfully',
      unreadCount,
    };
  }
}