import React from 'react';
import { Player } from '../types';

interface GameOverScreenProps {
  winner: Player | null;
  players: Player[];
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ winner, players, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-800 border-2 border-slate-700 rounded-lg shadow-2xl animate-fadeIn">
      <h1 className="text-5xl font-bold mb-4 text-cyan-400"
          style={{ textShadow: '0 0 8px #22d3ee' }}>
        Game Over
      </h1>
      {winner ? (
        <p className="text-3xl mb-6">
          <span className="font-bold text-yellow-300">{winner.name}</span> wins!
        </p>
      ) : (
        <p className="text-3xl mb-6 text-slate-300">It's a tie!</p>
      )}

      <div className="w-full max-w-sm mb-8">
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-slate-600 pb-2">Final Scores</h3>
        <div className="space-y-3 text-xl">
          <div className="flex justify-between">
            <span className="text-slate-300">{players[0].name}:</span>
            <span className="font-bold text-cyan-400">{players[0].score}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-300">{players[1].name}:</span>
            <span className="font-bold text-purple-400">{players[1].score}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={onRestart}
        className="px-8 py-4 bg-cyan-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOverScreen;
