import { create } from 'zustand';
import type { IrrigationSchedule, IrrigationMode } from '@hydro-orbit/shared-types';

interface IrrigationState {
  mode: IrrigationMode;
  schedules: IrrigationSchedule[];
  currentStatus: 'idle' | 'active' | 'paused';
  setMode: (mode: IrrigationMode) => void;
  setSchedules: (schedules: IrrigationSchedule[]) => void;
  setCurrentStatus: (status: 'idle' | 'active' | 'paused') => void;
}

export const useIrrigationStore = create<IrrigationState>((set) => ({
  mode: 'auto',
  schedules: [],
  currentStatus: 'idle',
  setMode: (mode) => set({ mode }),
  setSchedules: (schedules) => set({ schedules }),
  setCurrentStatus: (status) => set({ currentStatus: status }),
}));
