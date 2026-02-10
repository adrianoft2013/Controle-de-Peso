import React from 'react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { WeightEntry } from '../types';

interface HistoryItemProps {
  entry: WeightEntry;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ entry }) => {
  const getIcon = () => {
    switch (entry.trend) {
      case 'down':
        return <TrendingDown size={20} className="text-primary" />;
      case 'up':
        return <TrendingUp size={20} className="text-red-500" />;
      default:
        return <Minus size={20} className="text-slate-400" />;
    }
  };

  const getIconBg = () => {
    switch (entry.trend) {
      case 'down':
        return 'bg-primary/10';
      case 'up':
        return 'bg-red-50';
      default:
        return 'bg-slate-100';
    }
  };

  const getDiffColor = () => {
    switch (entry.trend) {
      case 'down':
        return 'text-green-500';
      case 'up':
        return 'text-red-500';
      default:
        return 'text-slate-400';
    }
  };

  const formatDiff = (val: number) => {
    if (val === 0) return '0.0 kg';
    return val > 0 ? `+${val.toFixed(1)} kg` : `${val.toFixed(1)} kg`;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-primary/5 hover:border-primary/20 transition-all shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full ${getIconBg()} flex items-center justify-center transition-colors`}>
          {getIcon()}
        </div>
        <div>
          <p className="font-bold text-lg text-slate-800">
            {entry.weight.toFixed(1)} <span className="text-sm font-normal text-slate-400">kg</span>
          </p>
          <p className="text-xs text-slate-400 font-medium">{entry.date}</p>
        </div>
      </div>
      <div className="text-right">
        <span className={`text-xs font-bold ${getDiffColor()}`}>
          {formatDiff(entry.diff)}
        </span>
      </div>
    </div>
  );
};
