import { create } from 'zustand';
import type { Sensor, SensorReading } from '@hydro-orbit/shared-types';

interface SensorsState {
  sensors: Sensor[];
  readings: Record<string, SensorReading[]>;
  setSensors: (sensors: Sensor[]) => void;
  addReading: (sensorId: string, reading: SensorReading) => void;
}

export const useSensorsStore = create<SensorsState>((set) => ({
  sensors: [],
  readings: {},
  setSensors: (sensors) => set({ sensors }),
  addReading: (sensorId, reading) =>
    set((state) => ({
      readings: {
        ...state.readings,
        [sensorId]: [...(state.readings[sensorId] || []), reading].slice(-100),
      },
    })),
}));
