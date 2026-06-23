import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  // Create Notification (for testing)
  @Post()
  createNotification(
    @Body()
    createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationService.createNotification(
      createNotificationDto,
    );
  }

  // GET /notifications?patientId=1
  @Get()
  getNotifications(
    @Query('patientId', ParseIntPipe)
    patientId: number,
  ) {
    return this.notificationService.getNotifications(
      patientId,
    );
  }

  // PATCH /notifications/1/read?patientId=1
  @Patch(':id/read')
  markAsRead(
    @Param('id', ParseIntPipe)
    id: number,

    @Query('patientId', ParseIntPipe)
    patientId: number,
  ) {
    return this.notificationService.markAsRead(
      id,
      patientId,
    );
  }

  // PATCH /notifications/read-all?patientId=1
  @Patch('read-all')
  markAllAsRead(
    @Query('patientId', ParseIntPipe)
    patientId: number,
  ) {
    return this.notificationService.markAllAsRead(
      patientId,
    );
  }

  // GET /notifications/unread-count?patientId=1
  @Get('unread-count')
  getUnreadCount(
    @Query('patientId', ParseIntPipe)
    patientId: number,
  ) {
    return this.notificationService.getUnreadCount(
      patientId,
    );
  }
}