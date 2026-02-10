import React, { useState } from 'react';
import { ArrowLeft, Trash2, Edit2, Check, X } from 'lucide-react';
import { HistoryItem } from './HistoryItem';
import { WeightEntry } from '../types';

interface HistoryScreenProps {
    history: WeightEntry[];
    onBack: () => void;
    onDelete: (id: string) => Promise<void>;
    onUpdate: (id: string, weight: number) => Promise<void>;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ history, onBack, onDelete, onUpdate }) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>('');

    const handleStartEdit = (entry: WeightEntry) => {
        setEditingId(entry.id);
        setEditValue(entry.weight.toString());
    };

    const handleSaveEdit = async (id: string) => {
        const weight = parseFloat(editValue);
        if (!isNaN(weight)) {
            await onUpdate(id, weight);
            setEditingId(null);
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-full bg-white shadow-sm border border-primary/5 flex items-center justify-center text-slate-600 hover:text-primary transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-bold text-slate-800">Histórico Completo</h2>
            </div>

            <div className="space-y-4">
                {history.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-slate-400">Nenhum registro encontrado.</p>
                    </div>
                ) : (
                    history.map((entry) => (
                        <div key={entry.id} className="relative group">
                            {editingId === entry.id ? (
                                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-primary shadow-md animate-in zoom-in-95 duration-200">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            className="w-20 bg-slate-50 border-none rounded-lg py-2 px-3 text-lg font-bold text-slate-800 outline-none ring-2 ring-primary/20"
                                            autoFocus
                                        />
                                        <span className="text-slate-400 font-bold">kg</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleSaveEdit(entry.id)}
                                            className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-200 hover:bg-green-600 transition-all"
                                        >
                                            <Check size={18} />
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 transition-all"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="flex-1">
                                        <HistoryItem entry={entry} />
                                    </div>
                                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleStartEdit(entry)}
                                            className="p-2 rounded-xl bg-white border border-primary/10 text-slate-400 hover:text-primary hover:border-primary/30 shadow-sm transition-all"
                                            title="Editar"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Tem certeza que deseja excluir este registro?')) {
                                                    onDelete(entry.id);
                                                }
                                            }}
                                            className="p-2 rounded-xl bg-white border border-red-100 text-slate-400 hover:text-red-500 hover:border-red-200 shadow-sm transition-all"
                                            title="Excluir"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
