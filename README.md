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