import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  notifications: {
    sms: boolean;
    push: boolean;
    email: boolean;
    criticalOnly: boolean;
  };
  theme: 'light' | 'dark';
  setNotifications: (notifications: SettingsState['notifications']) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notifications: {
        sms: true,
        push: true,
        email: false,
        criticalOnly: false,
      },
      theme: 'light',
      setNotifications: (notifications) => set({ notifications }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'hydro-settings',
    }
  )
);
