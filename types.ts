export enum GamePhase {
  START = 'START',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
}

export enum GameMode {
  PVP = 'PVP',
  PVE = 'PVE',
}

export enum PlayerType {
  HUMAN = 'HUMAN',
  AI = 'AI',
}

export interface Player {
  name: string;
  score: number;
  type: PlayerType;
}

export interface Move {
  stackIndex: number;
  disksToRemove: number;
}
