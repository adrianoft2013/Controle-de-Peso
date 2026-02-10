import React, { useState } from 'react';
import { UserProfile } from '../Controle-de-Peso/types';
import { USER_AVATAR_URL } from '../constants';
import { Edit2, Ruler, Weight, Calendar, User as UserIcon, Activity, ArrowLeft } from 'lucide-react';
import { ProfileForm } from './ProfileForm';

interface ProfileScreenProps {
    user: UserProfile | null;
    currentWeight: number;
    onSaveProfile: (data: UserProfile) => Promise<void>;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, currentWeight, onSaveProfile }) => {
    const [isEditing, setIsEditing] = useState(false);

    // If user doesn't exist and we're not editing (initial state), show form
    if (!user || isEditing) {
        return (
            <div className="flex flex-col gap-5">
                {user && (
                    <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold text-sm"
                    >
                        <ArrowLeft size={16} />
                        Voltar
                    </button>
                )}
                <ProfileForm
                    initialData={user}
                    onSave={async (data) => {
                        await onSaveProfile(data);
                        setIsEditing(false);
                    }}
                />
            </div>
        );
    }

    const heightInMeters = user.height / 100;
    const imc = currentWeight / (heightInMeters * heightInMeters);

    const getImcCategory = (value: number) => {
        if (value < 18.5) return { label: 'Abaixo do peso', color: 'text-blue-500', bg: 'bg-blue-50' };
        if (value < 24.9) return { label: 'Peso normal', color: 'text-green-500', bg: 'bg-green-50' };
        if (value < 29.9) return { label: 'Sobrepeso', color: 'text-orange-500', bg: 'bg-orange-50' };
        return { label: 'Obesidade', color: 'text-red-500', bg: 'bg-red-50' };
    };

    const imcCategory = getImcCategory(imc);
    const minScale = 15;
    const maxScale = 40;
    const percentage = Math.min(Math.max(((imc - minScale) / (maxScale - minScale)) * 100, 0), 100);

    return (
        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Profile Header Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-primary/5 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/10 to-transparent"></div>
                <div className="relative">
                    <img src={USER_AVATAR_URL} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" />
                    <button
                        onClick={() => setIsEditing(true)}
                        className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-sm hover:bg-blue-700 transition-colors"
                    >
                        <Edit2 size={14} />
                    </button>
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900">{user.name}</h2>
                <p className="text-slate-400 text-sm font-medium">Membro desde Out 2023</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-primary/5 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                        <UserIcon size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Sexo</p>
                        <p className="font-bold text-slate-700">{user.gender}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-primary/5 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Idade</p>
                        <p className="font-bold text-slate-700">{user.age} anos</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-primary/5 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                        <Ruler size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Altura</p>
                        <p className="font-bold text-slate-700">{user.height} cm</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-primary/5 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                        <Weight size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Peso Inicial</p>
                        <p className="font-bold text-slate-700">{user.startWeight} kg</p>
                    </div>
                </div>
            </div>

            {/* IMC Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-primary/5">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <Activity size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">IMC</h3>
                            <p className="text-xs text-slate-400">Índice de Massa Corporal</p>
                        </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${imcCategory.bg} ${imcCategory.color}`}>
                        {imcCategory.label}
                    </div>
                </div>

                <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-bold text-slate-900">{imc.toFixed(1)}</span>
                    <span className="text-sm text-slate-400 font-medium mb-2">kg/m²</span>
                </div>

                {/* IMC Bar visualization */}
                <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden flex mb-2">
                    <div className="h-full bg-blue-300 w-[14%]" title="Abaixo"></div>
                    <div className="h-full bg-green-400 w-[25.6%]" title="Normal"></div>
                    <div className="h-full bg-orange-400 w-[20%]" title="Sobrepeso"></div>
                    <div className="h-full bg-red-400 flex-1" title="Obesidade"></div>
                </div>

                {/* Pointer */}
                <div className="relative h-3 w-full">
                    <div
                        className="absolute top-0 -translate-x-1/2 transition-all duration-1000 ease-out"
                        style={{ left: `${percentage}%` }}
                    >
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-slate-800 mx-auto"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};