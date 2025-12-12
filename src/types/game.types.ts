import { Tile } from './level.types';

export interface GameState {
  currentLevel: string;
  tiles: Tile[];
  moves: number;
  stars: number;
  isComplete: boolean;
  isGameOver: boolean;
}

export interface ProgressState {
  highestLevel: number;
  highestVault: number;
  totalStars: number;
  levelStars: Record<string, number>;
  tutorialComplete: boolean;
}

export interface SettingsState {
  soundEnabled: boolean;
}

export interface Vault {
  id: number;
  name: string;
  requiredStars: number;
  levels: string[];
}
