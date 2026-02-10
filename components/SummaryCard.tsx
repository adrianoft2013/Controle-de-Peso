import React from 'react';

interface SummaryCardProps {
  label: string;
  value: string;
  unit: string;
  valueColor?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ 
  label, 
  value, 
  unit, 
  valueColor = "text-slate-800" 
}) => {
  return (
    <div className="bg-white p-3 rounded-xl border border-primary/5 shadow-sm flex flex-col justify-center">
      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wide">{label}</p>
      <p className={`text-xl font-bold ${valueColor}`}>
        {value}
        <span className="text-xs font-medium ml-0.5 text-slate-500">{unit}</span>
      </p>
    </div>
  );
};
