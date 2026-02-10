import React from 'react';
import { Home, User, Plus } from 'lucide-react';
import { Tab } from '../Controle-de-Peso/types';

interface BottomNavProps {
  currentTab: Tab;
  onNavigate: (tab: Tab) => void;
  onAddClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onNavigate, onAddClick }) => {
  const getItemClass = (tab: Tab) => {
    const isActive = currentTab === tab;
    return `flex flex-col items-center transition-colors ${isActive ? 'text-primary' : 'text-slate-300 hover:text-slate-500'
      }`;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 pb-6 pt-2 z-20">
      <div className="max-w-md mx-auto px-6 grid grid-cols-5 items-end h-14">
        {/* Home Button */}
        <div className="col-span-2 flex justify-center pb-1">
          <button
            className={getItemClass('home')}
            onClick={() => onNavigate('home')}
          >
            <Home size={24} strokeWidth={currentTab === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-semibold mt-1">Início</span>
          </button>
        </div>

        {/* Center Add Button */}
        <div className="col-span-1 flex justify-center relative -top-5">
          <button
            onClick={onAddClick}
            className="w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all"
            aria-label="Registrar peso"
          >
            <Plus size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Profile Button */}
        <div className="col-span-2 flex justify-center pb-1">
          <button
            className={getItemClass('profile')}
            onClick={() => onNavigate('profile')}
          >
            <User size={24} strokeWidth={currentTab === 'profile' ? 2.5 : 2} />
            <span className="text-[10px] font-semibold mt-1">Perfil</span>
          </button>
        </div>
      </div>
    </nav>
  );
};