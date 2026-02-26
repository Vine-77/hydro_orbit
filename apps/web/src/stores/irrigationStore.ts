import { create } from 'zustand';
import type { IrrigationSchedule, IrrigationMode, IrrigationEvent } from '@hydro-orbit/shared-types';

interface IrrigationState {
  mode: IrrigationMode;
  schedules: IrrigationSchedule[];
  currentStatus: 'idle' | 'active' | 'paused';
  history: IrrigationEvent[];
  isLoading: boolean;
  error: string | null;
  setMode: (mode: IrrigationMode) => void;
  setSchedules: (schedules: IrrigationSchedule[]) => void;
  setCurrentStatus: (status: 'idle' | 'active' | 'paused') => void;
  setHistory: (history: IrrigationEvent[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useIrrigationStore = create<IrrigationState>((set) => ({
  mode: IrrigationMode.AUTO,
  schedules: [],
  currentStatus: 'idle',
  history: [],
  isLoading: false,
  error: null,
  setMode: (mode) => set({ mode }),
  setSchedules: (schedules) => set({ schedules }),
  setCurrentStatus: (status) => set({ currentStatus: status }),
  setHistory: (history) => set({ history }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
