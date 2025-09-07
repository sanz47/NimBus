import React from 'react';
import { XIcon } from './Icons';

interface HelpScreenProps {
  onClose: () => void;
}

const HelpScreen: React.FC<HelpScreenProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative bg-slate-800 border-2 border-slate-700 rounded-lg shadow-2xl p-8 m-4 max-w-2xl w-full text-slate-300 transform transition-all duration-300 animate-fadeInUp"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-cyan-400 transition-colors"
          aria-label="Close help"
        >
          <XIcon className="w-7 h-7" />
        </button>
        
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6 text-center title-glow">
          How to Play NimBus
        </h1>
        
        <div className="space-y-6 text-base md:text-lg">
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2 border-b-2 border-cyan-500/30 pb-1">The Goal</h2>
            <p>The objective is simple: <strong className="text-white">score more points than your opponent.</strong></p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2 border-b-2 border-cyan-500/30 pb-1">How to Score</h2>
            <p>You score <strong className="text-white">1 point</strong> for each stack you completely empty.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2 border-b-2 border-cyan-500/30 pb-1">Gameplay</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Players take turns making a move.</li>
              <li>On your turn, you must:
                <ol className="list-decimal list-inside pl-6 mt-2 space-y-1 text-slate-400">
                  <li>Choose <strong className="text-slate-200">any single stack</strong> that is not empty.</li>
                  <li>Remove either <strong className="text-slate-200">1 or 2 disks</strong> from that stack.</li>
                </ol>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2 border-b-2 border-cyan-500/30 pb-1">Example</h2>
            <div className="bg-slate-900/70 p-4 rounded-md border border-slate-700">
              <p className="mb-2">Imagine a stack has <strong className="text-yellow-300">2 disks</strong> left.</p>
              <p className="mb-2">It's your turn. You select this stack and choose to remove <strong className="text-yellow-300">2 disks</strong>.</p>
              <p className="font-bold text-white">The stack is now empty. You score 1 point!</p>
            </div>
          </div>
          
          <div>
             <h2 className="text-xl font-semibold text-cyan-300 mb-2 border-b-2 border-cyan-500/30 pb-1">Winning the Game</h2>
             <p>The game ends when all stacks on the board are empty. The player with the highest score wins!</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-500 transition-colors transform hover:scale-105"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpScreen;