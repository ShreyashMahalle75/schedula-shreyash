import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationType } from './enums/notification-type.enum';

@Injectable()
export class NotificationService {
  private notifications: any[] = [];

  // Reusable Notification Creation Method
  create(
    patientId: number,
    title: string,
    message: string,
    type: NotificationType,
  ) {
    const notification = {
      id: this.notifications.length + 1,
      patientId,
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date(),
    };

    // Latest notification first
    this.notifications.unshift(notification);

    return {
      message: 'Notification created successfully',
      data: notification,
    };
  }

  // For Manual Testing API
  createNotification(
    createNotificationDto: CreateNotificationDto,
  ) {
    return this.create(
      createNotificationDto.patientId,
      createNotificationDto.title,
      createNotificationDto.message,
      createNotificationDto.type,
    );
  }

  // GET /notifications?patientId=1
  getNotifications(patientId: number) {
    const patientNotifications = this.notifications.filter(
      (notification) =>
        notification.patientId === patientId,
    );

    if (patientNotifications.length === 0) {
      return {
        message: 'No notifications available',
      };
    }

    return {
      message: 'Notifications fetched successfully',
      data: patientNotifications,
    };
  }

  // PATCH /notifications/:id/read
  markAsRead(id: number, patientId: number) {
    const notification = this.notifications.find(
      (item) =>
        item.id === id &&
        item.patientId === patientId,
    );

    if (!notification) {
      return {
        message: 'Notification not found',
      };
    }

    if (notification.isRead) {
      return {
        message: 'Notification already marked as read',
      };
    }

    notification.isRead = true;

    return {
      message: 'Notification marked as read successfully',
      data: notification,
    };
  }

  // PATCH /notifications/read-all
  markAllAsRead(patientId: number) {
    const patientNotifications =
      this.notifications.filter(
        (notification) =>
          notification.patientId === patientId,
      );

    if (patientNotifications.length === 0) {
      return {
        message: 'No notifications available',
      };
    }

    patientNotifications.forEach(
      (notification) =>
        (notification.isRead = true),
    );

    return {
      message: 'All notifications marked as read',
    };
  }

  // GET /notifications/unread-count
  getUnreadCount(patientId: number) {
    const unreadCount =
      this.notifications.filter(
        (notification) =>
          notification.patientId === patientId &&
          !notification.isRead,
      ).length;

    return {
      unreadCount,
    };
  }
}