import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { WeightEntry, UserProfile } from '../types';

export const useWeightData = () => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [history, setHistory] = useState<WeightEntry[]>([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // In a real app with Auth, we would fetch based on auth.uid()
            // For this demo, we'll fetch all or the first profile found
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .limit(1)
                .single();

            if (profileData) {
                setProfile({
                    name: profileData.name,
                    gender: profileData.gender,
                    age: profileData.age,
                    height: profileData.height,
                    startWeight: profileData.start_weight,
                    targetWeight: profileData.target_weight
                });
            }

            const { data: historyData, error: historyError } = await supabase
                .from('weight_entries')
                .select('*')
                .order('date', { ascending: false });

            if (historyData) {
                const formattedHistory: WeightEntry[] = historyData.map(entry => ({
                    id: entry.id,
                    weight: parseFloat(entry.weight),
                    date: new Date(entry.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
                    timestamp: new Date(entry.date).getTime(),
                    diff: parseFloat(entry.diff) || 0,
                    trend: (entry.trend as 'up' | 'down' | 'flat') || 'flat'
                }));
                setHistory(formattedHistory);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const addWeight = async (weight: number) => {
        try {
            // Calculate trend and diff based on last entry
            const lastEntry = history[0];
            let diff = 0;
            let trend: 'up' | 'down' | 'flat' = 'flat';

            if (lastEntry) {
                diff = weight - lastEntry.weight;
                trend = diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat';
            }

            const { error } = await supabase
                .from('weight_entries')
                .insert([
                    {
                        weight,
                        date: new Date().toISOString(),
                        trend,
                        diff
                    }
                ]);

            if (error) throw error;
            await fetchData(); // Refresh data
        } catch (error) {
            console.error('Error adding weight:', error);
            throw error;
        }
    };

    const saveProfile = async (profileData: UserProfile) => {
        try {
            // Since we're not using Auth IDs yet for this simple version,
            // we'll try to update the first profile or insert if none exists.
            const { data: existingProfiles } = await supabase
                .from('profiles')
                .select('id')
                .limit(1);

            const payload = {
                name: profileData.name,
                gender: profileData.gender,
                age: profileData.age,
                height: profileData.height,
                start_weight: profileData.startWeight,
                target_weight: profileData.targetWeight,
                updated_at: new Date().toISOString()
            };

            if (existingProfiles && existingProfiles.length > 0) {
                const { error } = await supabase
                    .from('profiles')
                    .update(payload)
                    .eq('id', existingProfiles[0].id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('profiles')
                    .insert([payload]);
                if (error) throw error;
            }

            await fetchData();
        } catch (error) {
            console.error('Error saving profile:', error);
            throw error;
        }
    };

    const deleteWeightEntry = async (id: string) => {
        try {
            const { error } = await supabase
                .from('weight_entries')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await fetchData();
        } catch (error) {
            console.error('Error deleting weight entry:', error);
            throw error;
        }
    };

    const updateWeightEntry = async (id: string, weight: number) => {
        try {
            // Recalculate diff/trend if we were more sophisticated, 
            // but for simplicity we'll just update weight 
            // and maybe let the backend/fetch re-sort 
            const { error } = await supabase
                .from('weight_entries')
                .update({ weight })
                .eq('id', id);

            if (error) throw error;
            await fetchData();
        } catch (error) {
            console.error('Error updating weight entry:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { profile, history, loading, addWeight, saveProfile, deleteWeightEntry, updateWeightEntry, refresh: fetchData };
};
