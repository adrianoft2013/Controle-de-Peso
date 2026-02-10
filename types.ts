export interface WeightEntry {
  id: string;
  weight: number;
  date: string; // ISO string or formatted date string for display
  timestamp: number;
  diff: number;
  trend: 'up' | 'down' | 'flat';
}

export interface ChartDataPoint {
  date: string;
  weight: number;
}

export interface UserProfile {
  name: string;
  gender: string;
  age: number;
  height: number; // cm
  startWeight: number; // kg
}

export type TimeRange = 'W' | 'M' | 'Y';
export type Tab = 'home' | 'profile';