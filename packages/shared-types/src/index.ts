export enum UserRole {
  FARMER = 'FARMER',
  ADMIN = 'ADMIN',
}

export enum SensorType {
  MOISTURE = 'MOISTURE',
  PH = 'PH',
  WATER_LEVEL = 'WATER_LEVEL',
}

export enum SensorStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  LOW_BATTERY = 'LOW_BATTERY',
}

export enum IrrigationTrigger {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL',
  SCHEDULED = 'SCHEDULED',
}

export enum IrrigationStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum AlertSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export enum IrrigationMode {
  AUTO = 'auto',
  MANUAL = 'manual',
  SCHEDULE = 'schedule',
}

export interface User {
  id: string;
  phone: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  area: number;
  userId: string;
  zones: Zone[];
  sensors: Sensor[];
  createdAt: Date;
}

export interface Zone {
  id: string;
  name: string;
  farmId: string;
  cropType: string;
  moistureThreshold: number;
  sensors: Sensor[];
}

export interface Sensor {
  id: string;
  type: SensorType;
  zoneId?: string;
  farmId: string;
  lastReading?: number;
  battery?: number;
  status: SensorStatus;
}

export interface SensorReading {
  id: string;
  sensorId: string;
  value: number;
  timestamp: Date;
}

export interface IrrigationEvent {
  id: string;
  zoneId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  volume?: number;
  trigger: IrrigationTrigger;
  status: IrrigationStatus;
}

export interface Alert {
  id: string;
  farmId: string;
  zoneId?: string;
  sensorId?: string;
  severity: AlertSeverity;
  message: string;
  acknowledged: boolean;
  createdAt: Date;
}

export interface IrrigationSchedule {
  id: string;
  zoneId: string;
  days: string[];
  time: string;
  duration: number;
  enabled: boolean;
}

export interface AuthPayload {
  userId: string;
  phone: string;
  role: UserRole;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: Omit<User, 'passwordHash'>;
}

export interface RegisterRequest {
  phone: string;
  password: string;
  name: string;
}

export interface IrrigationPrediction {
  predictedMoisture: number[];
  recommendedIrrigation: boolean;
  duration: number;
}

export interface WeatherForecast {
  temperature: number;
  humidity: number;
  rainfall: number;
  timestamp: Date;
}

export interface SensorData {
  deviceId: string;
  moisture?: number;
  ph?: number;
  waterLevel?: number;
  battery?: number;
  timestamp?: Date;
}
