import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Calendar, Ruler, Weight, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProfileFormProps {
    initialData?: UserProfile | null;
    onSave: (data: UserProfile) => Promise<void>;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData, onSave }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [name, setName] = useState(initialData?.name || '');
    const [gender, setGender] = useState(initialData?.gender || 'Masculino');
    const [age, setAge] = useState(initialData?.age.toString() || '');
    const [height, setHeight] = useState(initialData?.height.toString() || '');
    const [startWeight, setStartWeight] = useState(initialData?.startWeight.toString() || '');
    const [targetWeight, setTargetWeight] = useState(initialData?.targetWeight.toString() || '68.0');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave({
                name,
                gender,
                age: parseInt(age),
                height: parseInt(height),
                startWeight: parseFloat(startWeight),
                targetWeight: parseFloat(targetWeight)
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Erro ao salvar perfil. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={48} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Perfil Salvo!</h2>
                <p className="text-slate-400 mt-2">Suas informações foram atualizadas.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-primary/5 animate-in fade-in slide-in-from-bottom-6 duration-500">
            <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                    <User size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                    {initialData ? 'Editar Perfil' : 'Criar Perfil'}
                </h2>
                <p className="text-slate-400 text-sm mt-1 text-center">
                    Preencha seus dados para personalizar sua experiência
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Nome Completo</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">
                            <User size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Seu nome"
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-700 outline-none ring-2 ring-transparent focus:ring-primary/20 focus:bg-white transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Gênero</label>
                        <select
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 text-slate-700 outline-none ring-2 ring-transparent focus:ring-primary/20 focus:bg-white transition-all appearance-none"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Idade</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">
                                <Calendar size={18} />
                            </div>
                            <input
                                type="number"
                                placeholder="Anos"
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-700 outline-none ring-2 ring-transparent focus:ring-primary/20 focus:bg-white transition-all"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Altura (cm)</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">
                                <Ruler size={18} />
                            </div>
                            <input
                                type="number"
                                placeholder="175"
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-700 outline-none ring-2 ring-transparent focus:ring-primary/20 focus:bg-white transition-all"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Peso Inicial (kg)</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">
                                <Weight size={18} />
                            </div>
                            <input
                                type="number"
                                step="0.1"
                                placeholder="85.0"
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-700 outline-none ring-2 ring-transparent focus:ring-primary/20 focus:bg-white transition-all"
                                value={startWeight}
                                onChange={(e) => setStartWeight(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Meta de Peso (kg)</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">
                            <Activity size={18} />
                        </div>
                        <input
                            type="number"
                            step="0.1"
                            placeholder="68.0"
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-700 outline-none ring-2 ring-transparent focus:ring-primary/20 focus:bg-white transition-all"
                            value={targetWeight}
                            onChange={(e) => setTargetWeight(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                    {loading ? 'Salvando...' : 'Salvar Perfil'}
                    {!loading && <ArrowRight size={18} />}
                </button>
            </form>
        </div>
    );
};
