import { WeightEntry, ChartDataPoint, UserProfile } from './types';

export const USER_AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDNiTlhzTqOticCKd3ew09AeKrHXiJHTxtte3J-Dx5wUoxBc390Wnw4SfhVALWaEfpn-FzQSyovj1uGx4zhY3vhG2JA6kPjoBaP2a9052trJECdYkueFFo-NkCG9RJW-FczjFcY_TtI5Zgppn-ZcmZSkKO-rAWJ-bloyH_n1qKtP3AhmMQojEZuxvBulBgz_Lc5DujGbnGTBG6WPQLqxgXNBlzbU5-zmF1ho5UOrWVFPmW2L1uhHHoNpTklCNcGuHBRIpImeAbuPbs";

export const MOCK_USER: UserProfile = {
  name: "Alex Silva",
  gender: "Masculino",
  age: 28,
  height: 175,
  startWeight: 85.0
};

export const MOCK_HISTORY: WeightEntry[] = [
  {
    id: '1',
    weight: 72.4,
    date: 'Hoje, 08:30',
    timestamp: Date.now(),
    diff: -0.2,
    trend: 'down'
  },
  {
    id: '2',
    weight: 72.6,
    date: '23 Out, 08:45',
    timestamp: Date.now() - 86400000,
    diff: 0.0,
    trend: 'flat'
  },
  {
    id: '3',
    weight: 72.6,
    date: '22 Out, 09:15',
    timestamp: Date.now() - 86400000 * 2,
    diff: 0.5,
    trend: 'up'
  },
  {
    id: '4',
    weight: 72.1,
    date: '21 Out, 08:30',
    timestamp: Date.now() - 86400000 * 3,
    diff: -0.8,
    trend: 'down'
  },
  {
    id: '5',
    weight: 72.9,
    date: '20 Out, 08:20',
    timestamp: Date.now() - 86400000 * 4,
    diff: -0.1,
    trend: 'down'
  }
];

export const CHART_DATA: ChartDataPoint[] = [
  { date: '18 Out', weight: 70.5 },
  { date: '19 Out', weight: 70.8 },
  { date: '20 Out', weight: 71.2 },
  { date: '21 Out', weight: 71.5 },
  { date: '22 Out', weight: 72.0 },
  { date: '23 Out', weight: 72.2 },
  { date: 'Hoje', weight: 72.4 },
];