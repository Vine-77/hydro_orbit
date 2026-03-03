import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = useAuthStore.getState().token;
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export function useFarms() {
  return useQuery({
    queryKey: ['farms'],
    queryFn: () => fetchApi('/farms'),
  });
}

export function useFarm(farmId: string) {
  return useQuery({
    queryKey: ['farm', farmId],
    queryFn: () => fetchApi(`/farms/${farmId}`),
    enabled: !!farmId,
  });
}

export function useFarmStats(farmId: string) {
  return useQuery({
    queryKey: ['farm-stats', farmId],
    queryFn: () => fetchApi(`/farms/${farmId}/stats`),
    enabled: !!farmId,
  });
}

export function useSensors() {
  return useQuery({
    queryKey: ['sensors'],
    queryFn: () => fetchApi('/sensors'),
  });
}

export function useSensorHistory(sensorId: string, from?: string, to?: string) {
  return useQuery({
    queryKey: ['sensor-history', sensorId, from, to],
    queryFn: () => {
      const params = new URLSearchParams();
      if (from) params.set('from', from);
      if (to) params.set('to', to);
      return fetchApi(`/sensors/${sensorId}/history?${params}`);
    },
    enabled: !!sensorId,
  });
}

export function useAlerts(unread?: boolean, severity?: string) {
  return useQuery({
    queryKey: ['alerts', unread, severity],
    queryFn: () => {
      const params = new URLSearchParams();
      if (unread !== undefined) params.set('unread', String(unread));
      if (severity) params.set('severity', severity);
      return fetchApi(`/alerts?${params}`);
    },
  });
}

export function useIrrigationStatus() {
  return useQuery({
    queryKey: ['irrigation-status'],
    queryFn: () => fetchApi('/irrigation/status'),
  });
}

export function useIrrigationSchedules() {
  return useQuery({
    queryKey: ['irrigation-schedules'],
    queryFn: () => fetchApi('/irrigation/schedules'),
  });
}

export function useIrrigationHistory(farmId?: string, limit = 20) {
  return useQuery({
    queryKey: ['irrigation-history', farmId, limit],
    queryFn: () => {
      const params = new URLSearchParams();
      if (farmId) params.set('farmId', farmId);
      params.set('limit', String(limit));
      return fetchApi(`/irrigation/history?${params}`);
    },
  });
}

export function useCreateFarm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; location: string; area: number }) =>
      fetchApi('/farms', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farms'] });
    },
  });
}

export function useUpdateFarm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ farmId, data }: { farmId: string; data: Record<string, unknown> }) =>
      fetchApi(`/farms/${farmId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { farmId }) => {
      queryClient.invalidateQueries({ queryKey: ['farm', farmId] });
      queryClient.invalidateQueries({ queryKey: ['farms'] });
    },
  });
}

export function useDeleteFarm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (farmId: string) =>
      fetchApi(`/farms/${farmId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farms'] });
    },
  });
}

export function useCreateZone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ farmId, data }: { farmId: string; data: Record<string, unknown> }) =>
      fetchApi(`/farms/${farmId}/zones`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { farmId }) => {
      queryClient.invalidateQueries({ queryKey: ['farm', farmId] });
    },
  });
}

export function useStartManualIrrigation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { zoneId: string; duration: number }) =>
      fetchApi('/irrigation/manual', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['irrigation-status'] });
      queryClient.invalidateQueries({ queryKey: ['irrigation-history'] });
    },
  });
}

export function useStopIrrigation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetchApi('/irrigation/stop', { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['irrigation-status'] });
    },
  });
}

export function useSetIrrigationMode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { mode: 'auto' | 'manual' | 'schedule' }) =>
      fetchApi('/irrigation/mode', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['irrigation-status'] });
    },
  });
}

export function useCreateSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      fetchApi('/irrigation/schedules', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['irrigation-schedules'] });
    },
  });
}

export function useDeleteSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (scheduleId: string) =>
      fetchApi(`/irrigation/schedules/${scheduleId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['irrigation-schedules'] });
    },
  });
}

export function useAcknowledgeAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (alertId: string) =>
      fetchApi(`/alerts/${alertId}/acknowledge`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
}

export function useAcknowledgeAllAlerts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetchApi('/alerts/acknowledge-all', { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
}

export function useSensorReading() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { sensorId: string; value: number }) =>
      fetchApi('/sensors/reading', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sensors'] });
    },
  });
}
