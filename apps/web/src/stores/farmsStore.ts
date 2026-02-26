import { create } from 'zustand';
import type { Farm, Zone, Sensor } from '@hydro-orbit/shared-types';

interface FarmsState {
  currentFarm: Farm | null;
  farmsList: Farm[];
  setCurrentFarm: (farm: Farm | null) => void;
  setFarmsList: (farms: Farm[]) => void;
}

export const useFarmsStore = create<FarmsState>((set) => ({
  currentFarm: null,
  farmsList: [],
  setCurrentFarm: (farm) => set({ currentFarm: farm }),
  setFarmsList: (farms) => set({ farmsList: farms }),
}));
