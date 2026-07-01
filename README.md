# Schedula Backend

## Project Setup

```bash
npm install
npm run start:dev
```

## Environment Variables

DATABASE_URL=
JWT_SECRET=
PORT=3001

## Features Implemented

- Authentication
- Doctor & Patient Onboarding
- Doctor Discovery APIs
- Doctor Availability Management
- Slot Generation
- Appointment Booking
- Appointment Cancellation
- Stream Scheduling
- Wave Scheduling
- Appointment Rescheduling

## API Collection

docs/Schedula_API_Collection.json.json

## Flowcharts

docs/ER_Diagram.png
docs/day9-flowchart.png
docs/appointment-flowchart.png

## Repository

https://github.com/ShreyashMahalle75/schedula-shreyash

## Live Server URL

Not Deployed Yet
## Notification System Foundation

### Features Implemented

- View patient notifications
- Mark a notification as read
- Mark all notifications as read
- Get unread notification count
- Notification type management using enums
- Authorization checks for patient notifications
- Latest notifications displayed first

### Notification APIs

#### Get All Notifications

```http
GET /notifications?patientId=1
## Day 16 - Automated Appointment Reminder System (Cron Jobs)

### Features Implemented

* Added NestJS Schedule Module for background job execution.
* Implemented Cron Job running every minute.
* Automatically generates reminder notifications for upcoming appointments.
* Sends reminders only once using `reminderSent` flag.
* Supports Stream Scheduling reminders.
* Skips cancelled appointments.
* Skips completed appointments.
* Prevents duplicate reminder notifications.

### Reminder Workflow

1. Cron Job executes every minute.
2. Fetches all appointments.
3. Checks appointment status.
4. Skips cancelled and completed appointments.
5. Checks whether reminder is already sent.
6. Creates reminder notification automatically.
7. Updates `reminderSent` to `true`.

### Edge Cases Handled

* Appointment already cancelled.
* Appointment already completed.
* Reminder already sent.
* Invalid appointment data.

### APIs Used

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| POST   | `/appointment`               | Create appointment  |
| GET    | `/notifications?patientId=1` | Fetch notifications |
| PATCH  | `/appointment/:id/cancel`    | Cancel appointment  |
## Day 17 - Appointment Booking Window (Iteration 1)

### Features Implemented
- Booking allowed only for today's date.
- Past date booking restricted.
- Future date booking restricted.
- Invalid date format validation added.
- Slot availability validation added.
- Meaningful error responses implemented.

### Business Rules
✅ Today → Booking Allowed

❌ Past Date → Not Allowed

❌ Tomorrow → Not Allowed

❌ Future Date → Not Allowed

### Edge Cases Handled
- Past date booking
- Future date booking
- Invalid date format
- Invalid doctor
- Slot already booked


# Day 20 – Future Appointment Booking Configuration

## Overview

Implemented configurable future appointment booking for doctors.

### Features

- Added `allowFutureBooking` configuration.
- Added optional `maxFutureBookingDays`.
- Default future booking limit is 7 days when not configured.
- Existing booking window validation is retained.
- Existing slot validation is retained.
- Existing notification flow is retained.

## Business Rules

### Doctor Configuration

Doctor can configure:

- allowFutureBooking
- maxFutureBookingDays

### Scenario 1

allowFutureBooking = false

✅ Today

❌ Tomorrow

❌ Future Dates

### Scenario 2

allowFutureBooking = true

maxFutureBookingDays = 5

✅ Today

✅ Next 5 Days

❌ Beyond 5 Days

### Scenario 3

allowFutureBooking = true

maxFutureBookingDays = null

System automatically uses

7 Days

## Validations

- Past Date Validation
- Invalid Date Format
- Doctor Not Found
- Booking Window Validation
- Slot Already Booked
- Future Booking Validation
- Default 7 Day Validation

## Tested APIs

- Today Booking
- Slot Already Booked
- Future Booking Disabled
- Future Booking Enabled
- Booking Beyond 5 Days
- Default 7 Day Booking
- Beyond Default 7 Days
- Invalid Doctor
- Invalid Date Format
- Past Date Booking