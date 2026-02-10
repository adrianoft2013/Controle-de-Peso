import React, { useState } from 'react';
import { SummaryCard } from './components/SummaryCard';
import { WeightChart } from './components/WeightChart';
import { HistoryItem } from './components/HistoryItem';
import { BottomNav } from './components/BottomNav';
import { ProfileScreen } from './components/ProfileScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { AddWeightModal } from './components/AddWeightModal';
import { USER_AVATAR_URL } from './constants';
import { TimeRange, Tab } from './types';
import { useWeightData } from './hooks/useWeightData';

const App: React.FC = () => {
  const { profile, history, loading, addWeight, saveProfile, deleteWeightEntry, updateWeightEntry } = useWeightData();
  const [timeRange, setTimeRange] = useState<TimeRange>('W');
  const [currentTab, setCurrentTab] = useState<Tab | 'history'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentWeight = history.length > 0 ? history[0].weight : (profile?.startWeight || 0);
  const targetWeight = profile?.targetWeight || 68.0;
  const weightDiff = profile ? (currentWeight - profile.startWeight).toFixed(1) : '0.0';

  const chartData = history.slice().reverse().map(entry => ({
    date: entry.date.split(',')[0],
    weight: entry.weight
  }));

  const timeRangeLabels: Record<TimeRange, string> = {
    'W': 'S',
    'M': 'M',
    'Y': 'A'
  };


  const getPageTitle = () => {
    switch (currentTab) {
      case 'profile': return 'Meu Perfil';
      case 'history': return 'Histórico';
      default: return 'Controle de Peso';
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (currentTab === 'profile') {
      return (
        <ProfileScreen
          user={profile}
          currentWeight={currentWeight}
          onSaveProfile={saveProfile}
        />
      );
    }

    if (currentTab === 'history') {
      return (
        <HistoryScreen
          history={history}
          onBack={() => setCurrentTab('home')}
          onDelete={deleteWeightEntry}
          onUpdate={updateWeightEntry}
        />
      );
    }

    return (
      <>
        {/* Summary Stats */}
        <section className="mt-6 mb-8 grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SummaryCard
            label="Atual"
            value={currentWeight.toFixed(1)}
            unit="kg"
            valueColor="text-primary"
          />
          <SummaryCard
            label="Meta"
            value={targetWeight.toFixed(1)}
            unit="kg"
          />
          <SummaryCard
            label="Dif"
            value={weightDiff}
            unit="kg"
            valueColor={parseFloat(weightDiff) <= 0 ? 'text-green-500' : 'text-red-500'}
          />
        </section>

        {/* Chart Section */}
        <section className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tendência</h2>
            <div className="flex bg-slate-200/50 rounded-lg p-1 gap-1">
              {(['W', 'M', 'Y'] as TimeRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`
                    px-3 py-1 text-xs font-bold rounded-md transition-all
                    ${timeRange === range
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-slate-400 hover:text-slate-600'
                    }
                  `}
                >
                  {timeRangeLabels[range]}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-primary/5 shadow-sm overflow-hidden">
            <WeightChart data={chartData} />
          </div>
        </section>

        {/* History Section */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Histórico</h2>
            <button
              onClick={() => setCurrentTab('history')}
              className="text-xs font-bold text-primary hover:text-blue-700 transition-colors"
            >
              Ver Tudo
            </button>
          </div>

          <div className="space-y-3">
            {history.slice(0, 2).map((entry) => (
              <HistoryItem key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto relative bg-bg-light">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-bg-light/90 backdrop-blur-md border-b border-primary/5 transition-all">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">{getPageTitle()}</h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setCurrentTab('profile')}
              className={`w-10 h-10 rounded-full border-2 overflow-hidden shadow-sm transition-colors ${currentTab === 'profile' ? 'border-primary ring-2 ring-primary/20' : 'border-primary/20 hover:border-primary'
                }`}
            >
              <img
                src={USER_AVATAR_URL}
                alt="Perfil do Usuário"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 pt-2">
        {renderContent()}
      </main>

      <BottomNav
        currentTab={currentTab === 'history' ? 'home' : (currentTab as Tab)}
        onNavigate={setCurrentTab}
        onAddClick={() => setIsModalOpen(true)}
      />

      <AddWeightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(w) => {
          addWeight(w);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default App;