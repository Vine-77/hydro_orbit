import { z } from 'zod';

export const loginSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const farmSchema = z.object({
  name: z.string().min(1, 'Farm name is required').max(100, 'Farm name too long'),
  location: z.string().min(1, 'Location is required').max(200, 'Location too long'),
  area: z.number().positive('Area must be a positive number').max(10000, 'Area cannot exceed 10000 hectares'),
});

export const zoneSchema = z.object({
  name: z.string().min(1, 'Zone name is required').max(100, 'Zone name too long'),
  cropType: z.string().min(1, 'Crop type is required').max(100, 'Crop type too long'),
  moistureThreshold: z.number().min(0).max(100, 'Threshold must be between 0 and 100'),
});

export const irrigationScheduleSchema = z.object({
  zoneId: z.string().uuid('Invalid zone ID'),
  days: z.array(z.enum(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'])),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'),
  duration: z.number().positive().max(120, 'Duration cannot exceed 120 minutes'),
  enabled: z.boolean(),
});

export const sensorReadingSchema = z.object({
  sensorId: z.string(),
  value: z.number(),
  timestamp: z.date().optional(),
});

export const manualIrrigationSchema = z.object({
  zoneId: z.string().uuid('Invalid zone ID'),
  duration: z.number().positive().max(30, 'Duration cannot exceed 30 minutes'),
});

export const irrigationModeSchema = z.object({
  mode: z.enum(['auto', 'manual', 'schedule']),
});

export const alertAcknowledgeSchema = z.object({
  alertId: z.string().uuid('Invalid alert ID'),
});

export const sensorSchema = z.object({
  type: z.enum(['MOISTURE', 'PH', 'WATER_LEVEL']),
  zoneId: z.string().uuid('Invalid zone ID').optional(),
  farmId: z.string().uuid('Invalid farm ID'),
});

export const updateSensorSchema = z.object({
  sensorId: z.string().uuid('Invalid sensor ID'),
  status: z.enum(['ONLINE', 'OFFLINE', 'LOW_BATTERY']).optional(),
  battery: z.number().min(0).max(100).optional(),
});

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export const dateRangeSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type FarmInput = z.infer<typeof farmSchema>;
export type ZoneInput = z.infer<typeof zoneSchema>;
export type IrrigationScheduleInput = z.infer<typeof irrigationScheduleSchema>;
export type SensorReadingInput = z.infer<typeof sensorReadingSchema>;
export type ManualIrrigationInput = z.infer<typeof manualIrrigationSchema>;
export type IrrigationModeInput = z.infer<typeof irrigationModeSchema>;
export type AlertAcknowledgeInput = z.infer<typeof alertAcknowledgeSchema>;
export type SensorInput = z.infer<typeof sensorSchema>;
export type UpdateSensorInput = z.infer<typeof updateSensorSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type DateRangeInput = z.infer<typeof dateRangeSchema>;
