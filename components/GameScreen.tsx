import React, { useState, useEffect } from 'react';
import { Player } from '../types';
import Stack from './Stack';
import { UserIcon, CpuChipIcon, BackIcon } from './Icons';

interface GameScreenProps {
  players: Player[];
  stacks: number[];
  currentPlayerIndex: number;
  onMove: (stackIndex: number, amount: number) => void;
  onGoBack: () => void;
}

const PlayerCard: React.FC<{ player: Player; isActive: boolean }> = ({ player, isActive }) => {
  const isAI = player.type === 'AI';
  const color = isAI ? 'purple' : 'cyan';
  
  return (
    <div className={`relative p-4 md:p-6 border-2 rounded-lg transition-all duration-300 ${isActive ? `border-${color}-400 shadow-${color}-500/50 shadow-lg bg-slate-800/50` : 'border-slate-700 bg-slate-800'}`}>
      <div className="flex items-center mb-3">
        {isAI ? <CpuChipIcon className={`w-7 h-7 mr-3 text-${color}-400`} /> : <UserIcon className={`w-7 h-7 mr-3 text-${color}-400`} />}
        <h2 className={`text-xl md:text-2xl font-bold truncate ${isActive ? `text-${color}-300` : 'text-slate-300'}`}>{player.name}</h2>
      </div>
      <div className="text-lg md:text-xl text-slate-400">Score: <span className={`font-bold text-2xl ${isActive ? 'text-white' : 'text-slate-200'}`}>{player.score}</span></div>
       {isActive && <div className={`absolute -top-1 -right-1 w-3 h-3 bg-${color}-400 rounded-full animate-ping`}></div>}
    </div>
  );
};

const GameScreen: React.FC<GameScreenProps> = ({ players, stacks, currentPlayerIndex, onMove, onGoBack }) => {
  const [selectedStack, setSelectedStack] = useState<number | null>(null);
  const [disksToRemove, setDisksToRemove] = useState(1);

  const currentPlayer = players[currentPlayerIndex];

  useEffect(() => {
    // Reset selection when the player changes
    if (currentPlayer.type === 'AI') {
      setSelectedStack(null);
      setDisksToRemove(1);
    }
  }, [currentPlayer]);

  const handleStackClick = (index: number) => {
    if (currentPlayer.type === 'HUMAN' && stacks[index] > 0) {
      setSelectedStack(index);
      setDisksToRemove(1);
    }
  };

  const handleMakeMove = () => {
    if (selectedStack !== null && disksToRemove > 0) {
      onMove(selectedStack, disksToRemove);
      setSelectedStack(null);
      setDisksToRemove(1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col animate-fadeIn">
      <div className="w-full flex justify-start mb-2">
        <button
          onClick={onGoBack}
          className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors p-2 -ml-2 group"
          aria-label="Go back to main menu"
        >
          <BackIcon className="w-6 h-6 mr-1 group-hover:translate-x-[-2px] transition-transform" />
          <span className="font-semibold">Back</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6">
        <PlayerCard player={players[0]} isActive={currentPlayerIndex === 0} />
        <PlayerCard player={players[1]} isActive={currentPlayerIndex === 1} />
      </div>

      <div className="relative flex-grow bg-slate-900/50 border-2 border-slate-800 rounded-lg p-4 md:p-8 flex flex-col items-center justify-center shadow-inner overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-end justify-center gap-2 md:gap-4 w-full">
          {stacks.map((diskCount, index) => (
            <Stack
              key={index}
              diskCount={diskCount}
              isSelected={selectedStack === index}
              onClick={() => handleStackClick(index)}
              isDisabled={currentPlayer.type === 'AI' || diskCount === 0}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-slate-800 border border-slate-700 rounded-lg shadow-md h-[76px] flex items-center justify-center">
        {currentPlayer.type === 'AI' ? (
          <div className="text-center text-purple-300 flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg font-semibold">{currentPlayer.name} is thinking...</span>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
            <p className="text-lg font-semibold text-slate-300 flex-grow text-center md:text-left">
              {selectedStack === null
                ? "Select a stack to make your move."
                : `Selected Stack #${selectedStack + 1}. Disks to remove:`}
            </p>
            {selectedStack !== null && (
              <>
                <div className="flex items-center gap-2">
                  <button onClick={() => setDisksToRemove(1)} className={`px-4 py-2 rounded ${disksToRemove === 1 ? 'bg-cyan-500 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>1</button>
                  <button onClick={() => setDisksToRemove(2)} disabled={stacks[selectedStack] < 2} className={`px-4 py-2 rounded ${disksToRemove === 2 ? 'bg-cyan-500 text-white' : 'bg-slate-700 hover:bg-slate-600'} disabled:bg-slate-800 disabled:cursor-not-allowed`}>2</button>
                </div>
                <button
                  onClick={handleMakeMove}
                  className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-500 transition-colors transform hover:scale-105"
                >
                  Make Move
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;