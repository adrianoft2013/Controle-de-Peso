import React, { useState } from 'react';
import { X, Calendar, Weight } from 'lucide-react';

interface AddWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (weight: number, date: string) => void;
}

export const AddWeightModal: React.FC<AddWeightModalProps> = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  // Default to today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [weight, setWeight] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight) {
      onSave(parseFloat(weight), date);
      setWeight(''); // Reset
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Registrar Peso</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Data</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                <Calendar size={20} />
              </div>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-700 font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Peso (kg)</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                <Weight size={20} />
              </div>
              <input
                type="number"
                step="0.1"
                required
                placeholder="0.0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-700 font-medium text-lg"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-blue-600 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};