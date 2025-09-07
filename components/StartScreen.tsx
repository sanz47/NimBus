import React from 'react';
import { GameMode } from '../types';
import { UserIcon, CpuChipIcon, QuestionMarkIcon } from './Icons';

interface StartScreenProps {
  onStartGame: (mode: GameMode) => void;
  onShowHelp: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, onShowHelp }) => {
  return (
    <div className="relative flex flex-col items-center justify-center h-full animate-fadeIn p-4">
       <button 
        onClick={onShowHelp}
        className="absolute top-4 right-4 text-slate-500 hover:text-cyan-400 transition-colors duration-300"
        aria-label="Show help"
      >
        <QuestionMarkIcon className="w-8 h-8" />
      </button>

      <h1 className="text-6xl md:text-8xl font-bold text-cyan-400 mb-4 tracking-widest uppercase title-glow">
        NimBus
      </h1>
      <p className="text-slate-400 mb-12 text-lg">Select a game mode to begin</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
        <button
          onClick={() => onStartGame(GameMode.PVP)}
          className="group relative flex items-center justify-center p-6 bg-slate-800 border-2 border-slate-700 rounded-lg shadow-lg hover:bg-slate-700 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105"
        >
          <span className="absolute top-0 left-0 w-full h-full bg-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" style={{filter: 'blur(20px)'}}></span>
          <UserIcon className="w-8 h-8 mr-4 text-cyan-400" />
          <span className="text-2xl font-semibold">Player vs Player</span>
        </button>
        <button
          onClick={() => onStartGame(GameMode.PVE)}
          className="group relative flex items-center justify-center p-6 bg-slate-800 border-2 border-slate-700 rounded-lg shadow-lg hover:bg-slate-700 hover:border-purple-400 transition-all duration-300 transform hover:scale-105"
        >
          <span className="absolute top-0 left-0 w-full h-full bg-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" style={{filter: 'blur(20px)'}}></span>
          <CpuChipIcon className="w-8 h-8 mr-4 text-purple-400" />
          <span className="text-2xl font-semibold">Player vs AI</span>
        </button>
      </div>
    </div>
  );
};

export default StartScreen;