export interface Position {
  row: number;
  col: number;
}

export interface StarThreshold {
  three: number;
  two: number | { min: number; max: number };
  one: number | { min: number; max: number };
}

export interface Level {
  id: string;
  tiles: number[];
  starThresholds: StarThreshold;
}

export interface Tile {
  id: string;
  value: number;
  position: Position;
  isComplete: boolean;
  isPair: boolean;
  isIsolated: boolean;
}

export type SwipeDirection =
  | 'left'
  | 'right'
  | 'up'
  | 'down'
  | 'upleft'
  | 'upright'
  | 'downleft'
  | 'downright';

export interface TutorialLesson {
  id: string;
  title: string;
  text: string;
  level: string;
}
