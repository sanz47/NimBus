import React, { useState, useCallback, useEffect } from 'react';
import { GamePhase, Player, GameMode, PlayerType, Move } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import HelpScreen from './components/HelpScreen';

const getLocalAiMove = (currentStacks: number[]): Move => {
  // Priority 1: Find a stack to empty and score a point.
  for (let i = 0; i < currentStacks.length; i++) {
    if (currentStacks[i] === 1 || currentStacks[i] === 2) {
      return { stackIndex: i, disksToRemove: currentStacks[i] };
    }
  }

  // Priority 2: If no immediate score, make a random valid move.
  const validStacks = currentStacks
    .map((_, i) => i)
    .filter(i => currentStacks[i] > 0);
    
  if (validStacks.length === 0) {
    // Should not happen if game logic is correct, but as a fallback
    return { stackIndex: 0, disksToRemove: 0 };
  }

  const randomStackIndex = validStacks[Math.floor(Math.random() * validStacks.length)];
  // Take 1 or 2 disks, but not more than are available.
  const maxDisks = Math.min(currentStacks[randomStackIndex], 2);
  const disksToRemove = Math.floor(Math.random() * maxDisks) + 1;
  
  return { stackIndex: randomStackIndex, disksToRemove };
};


const App: React.FC = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.START);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [stacks, setStacks] = useState<number[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const initializeGame = useCallback((mode: GameMode) => {
    setGameMode(mode);
    const player1: Player = { name: 'Player 1', score: 0, type: PlayerType.HUMAN };
    const player2: Player = mode === GameMode.PVE ? 
      { name: 'AI', score: 0, type: PlayerType.AI } : 
      { name: 'Player 2', score: 0, type: PlayerType.HUMAN };
    setPlayers([player1, player2]);

    const stackCount = Math.floor(Math.random() * 5) + 5; // 5 to 9 stacks
    const newStacks = Array.from({ length: stackCount }, () => Math.floor(Math.random() * 6) + 5); // 5 to 10 disks
    setStacks(newStacks);
    
    setCurrentPlayerIndex(Math.random() < 0.5 ? 0 : 1);
    setWinner(null);
    setGamePhase(GamePhase.PLAYING);
  }, []);

  const handleMove = useCallback((stackIndex: number, amount: number) => {
    if (stacks[stackIndex] < amount || amount <= 0) {
      // This check is mainly for human players; AI moves should always be valid.
      console.warn("Invalid move attempted.");
      return;
    }

    const newStacks = [...stacks];
    newStacks[stackIndex] -= amount;
    setStacks(newStacks);

    const newPlayers = [...players];
    if (newStacks[stackIndex] === 0) {
      newPlayers[currentPlayerIndex].score++;
      setPlayers(newPlayers);
    }
    
    const remainingDisks = newStacks.reduce((sum, current) => sum + current, 0);
    if (remainingDisks === 0) {
      const p1Score = newPlayers[0].score;
      const p2Score = newPlayers[1].score;
      setWinner(p1Score > p2Score ? newPlayers[0] : (p2Score > p1Score ? newPlayers[1] : null));
      setGamePhase(GamePhase.GAME_OVER);
    } else {
      setCurrentPlayerIndex(prev => (prev + 1) % 2);
    }
  }, [stacks, players, currentPlayerIndex]);

  const handleRestart = () => {
    setGamePhase(GamePhase.START);
    setGameMode(null);
  };

  useEffect(() => {
    const currentPlayer = players[currentPlayerIndex];
    if (gamePhase === GamePhase.PLAYING && currentPlayer?.type === PlayerType.AI) {
      const performAiMove = () => {
        // Add a delay for better UX
        setTimeout(() => {
          const move = getLocalAiMove(stacks);
          handleMove(move.stackIndex, move.disksToRemove);
        }, 1500);
      };
      performAiMove();
    }
  }, [currentPlayerIndex, gamePhase, players, stacks, handleMove]);

  const renderContent = () => {
    switch (gamePhase) {
      case GamePhase.START:
        return <StartScreen onStartGame={initializeGame} onShowHelp={() => setIsHelpVisible(true)} />;
      case GamePhase.PLAYING:
        return (
          <GameScreen
            players={players}
            stacks={stacks}
            currentPlayerIndex={currentPlayerIndex}
            onMove={handleMove}
            onGoBack={handleRestart}
          />
        );
      case GamePhase.GAME_OVER:
        return (
          <GameOverScreen
            winner={winner}
            players={players}
            onRestart={handleRestart}
          />
        );
      default:
        return <StartScreen onStartGame={initializeGame} onShowHelp={() => setIsHelpVisible(true)} />;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-50 flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-full max-w-7xl mx-auto">
        {renderContent()}
      </div>
      {isHelpVisible && <HelpScreen onClose={() => setIsHelpVisible(false)} />}
    </div>
  );
};

export default App;