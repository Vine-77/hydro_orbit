# Hydro-Orbit API

REST API for the Hydro-Orbit smart irrigation system.

## Base URL

```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | User login |
| POST | /auth/register | User registration |
| POST | /auth/refresh | Refresh token |

### Farms

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /farms | List user farms |
| POST | /farms | Create new farm |
| GET | /farms/:farmId | Get farm details |
| PUT | /farms/:farmId | Update farm |
| DELETE | /farms/:farmId | Delete farm |
| GET | /farms/:farmId/stats | Get farm statistics |
| POST | /farms/:farmId/zones | Create zone |

### Sensors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /sensors | List all sensors |
| GET | /sensors/:sensorId | Get sensor details |
| GET | /sensors/:sensorId/history | Get sensor history |
| POST | /sensors/reading | Submit sensor reading |
| POST | /sensors/readings/batch | Submit batch readings |

### Irrigation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /irrigation/status | Get irrigation status |
| POST | /irrigation/manual | Start manual irrigation |
| POST | /irrigation/stop | Stop irrigation |
| GET | /irrigation/schedules | List schedules |
| POST | /irrigation/schedules | Create schedule |
| DELETE | /irrigation/schedules/:id | Delete schedule |
| POST | /irrigation/mode | Set irrigation mode |
| GET | /irrigation/history | Get irrigation history |

### Alerts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /alerts | List alerts |
| POST | /alerts/:alertId/acknowledge | Acknowledge alert |

### History

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /history | Get event history |

## WebSocket Events

Connect to `/` namespace for real-time updates.

### Client Events

- `join-farm` - Join farm room for updates

### Server Events

- `sensor:update` - Sensor reading update
- `irrigation:status` - Irrigation status change
- `alert:new` - New alert notification
