import { Level } from '../types/level.types';

// Helper function to parse threshold values (handles ranges like "12-13")
function parseThreshold(value: string): number | { min: number; max: number } {
  if (value.includes('-')) {
    const [min, max] = value.split('-').map(Number);
    return { min, max };
  }
  return Number(value);
}

export const LEVELS: Record<string, Level> = {
  'level-1': {
    id: 'level-1',
    tiles: [3, 3],
    starThresholds: {
      three: 1,
      two: 1,
      one: 1
    }
  },
  'level-2': {
    id: 'level-2',
    tiles: [2, 1, 3],
    starThresholds: {
      three: 2,
      two: 2,
      one: 2
    }
  },
  'level-3': {
    id: 'level-3',
    tiles: [2, 4, 3, 1],
    starThresholds: {
      three: 3,
      two: 3,
      one: 3
    }
  },
  'level-4': {
    id: 'level-4',
    tiles: [2, 2, 1, 1, 2, 1, 2, 1, 2],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level1': {
    id: 'level1',
    tiles: [2, 1, 2, 2, 2, 1, 1, 1, 2],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level2': {
    id: 'level2',
    tiles: [1, 3, 2, 2, 1, 2, 1, 3, 1],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level3': {
    id: 'level3',
    tiles: [3, 5, 1, 5, 2, 4, 1, 2, 1],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level4': {
    id: 'level4',
    tiles: [3, 2, 1, 5, 4, 3, 2, 1, 5],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level5': {
    id: 'level5',
    tiles: [3, 5, 3, 1, 4, 2, 5, 4, 1],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level6': {
    id: 'level6',
    tiles: [6, 3, 5, 2, 8, 5, 9, 4, 2],
    starThresholds: {
      three: 7,
      two: 7,
      one: 8
    }
  },
  'level7': {
    id: 'level7',
    tiles: [2, 9, 5, 5, 1, 8, 7, 3, 6],
    starThresholds: {
      three: 7,
      two: 7,
      one: 8
    }
  },
  'level8': {
    id: 'level8',
    tiles: [12, 4, 11, 8, 7, 15, 20, 9, 16],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level9': {
    id: 'level9',
    tiles: [17, 4, 2, 3, 15, 8, 6, 20, 5],
    starThresholds: {
      three: 7,
      two: 7,
      one: 8
    }
  },
  'level10': {
    id: 'level10',
    tiles: [8, 31, 23, 15, 13, 5, 47, 32, 18],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level11': {
    id: 'level11',
    tiles: [8, 1, 5, 2],
    starThresholds: {
      three: 3,
      two: 3,
      one: 3
    }
  },
  'level12': {
    id: 'level12',
    tiles: [2, 4, 5, 2, 5, 1, 1, 1, 3],
    starThresholds: {
      three: 5,
      two: 6,
      one: { min: 7, max: 8 }
    }
  },
  'level13': {
    id: 'level13',
    tiles: [6, 4, 1, 3, 2, 3, 4, 5, 2],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level14': {
    id: 'level14',
    tiles: [8, 7, 3, 4, 3, 1, 6, 5, 9],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level15': {
    id: 'level15',
    tiles: [9, 1, 2, 3, 7, 6, 6, 9, 5],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level16': {
    id: 'level16',
    tiles: [1, 4, 6, 16, 8, 7, 13, 3, 2],
    starThresholds: {
      three: 7,
      two: 7,
      one: 8
    }
  },
  'level17': {
    id: 'level17',
    tiles: [17, 5, 7, 13, 3, 12, 6, 19, 4],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level18': {
    id: 'level18',
    tiles: [12, 2, 13, 6, 5, 4, 7, 8, 17],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level19': {
    id: 'level19',
    tiles: [19, 6, 17, 20, 12, 1, 9, 4, 6],
    starThresholds: {
      three: 7,
      two: 7,
      one: 8
    }
  },
  'level20': {
    id: 'level20',
    tiles: [32, 26, 48, 18, 16, 19, 8, 5, 24],
    starThresholds: {
      three: 6,
      two: 7,
      one: 8
    }
  },
  'level21': {
    id: 'level21',
    tiles: [5, 7, 1, 6, 9, 3, 4, 1, 4, 6, 3, 7, 8, 5, 9, 2],
    starThresholds: {
      three: 11,
      two: { min: 12, max: 13 },
      one: { min: 14, max: 15 }
    }
  },
  'level22': {
    id: 'level22',
    tiles: [8, 2, 7, 9, 3, 6, 2, 6, 7, 4, 3, 1, 8, 2, 5, 9],
    starThresholds: {
      three: 11,
      two: { min: 12, max: 13 },
      one: { min: 14, max: 15 }
    }
  },
  'level23': {
    id: 'level23',
    tiles: [10, 6, 19, 13, 4, 9, 3, 2, 8, 14, 5, 12, 1, 11, 17, 20],
    starThresholds: {
      three: 12,
      two: 13,
      one: { min: 14, max: 15 }
    }
  },
  'level24': {
    id: 'level24',
    tiles: [18, 14, 3, 1, 7, 6, 5, 15, 2, 20, 13, 3, 9, 4, 3, 1],
    starThresholds: {
      three: 12,
      two: 13,
      one: { min: 14, max: 15 }
    }
  },
  'level25': {
    id: 'level25',
    tiles: [17, 22, 15, 12, 33, 50, 37, 29, 18, 31, 11, 41, 7, 20, 10, 21],
    starThresholds: {
      three: 11,
      two: { min: 12, max: 13 },
      one: { min: 14, max: 15 }
    }
  },
  'level26': {
    id: 'level26',
    tiles: [15, 28, 33, 7, 4, 18, 20, 13, 40, 24, 8, 10, 13, 19, 3, 7],
    starThresholds: {
      three: 11,
      two: { min: 12, max: 13 },
      one: { min: 14, max: 15 }
    }
  },
  'level27': {
    id: 'level27',
    tiles: [5, 9, 22, 8, 50, 17, 42, 34, 21, 7, 13, 24, 6, 20, 13, 37],
    starThresholds: {
      three: 12,
      two: 13,
      one: { min: 14, max: 15 }
    }
  },
  'level28': {
    id: 'level28',
    tiles: [7, 8, 4, 26, 25, 49, 14, 39, 4, 10, 42, 31, 27, 6, 9, 11],
    starThresholds: {
      three: 12,
      two: 13,
      one: { min: 14, max: 15 }
    }
  },
  'level29': {
    id: 'level29',
    tiles: [38, 8, 9, 50, 21, 24, 30, 27, 13, 17, 3, 26, 45, 31, 7, 11],
    starThresholds: {
      three: 11,
      two: { min: 12, max: 13 },
      one: { min: 14, max: 15 }
    }
  },
  'level30': {
    id: 'level30',
    tiles: [5, 37, 24, 49, 25, 50, 17, 9, 31, 12, 44, 15, 13, 19, 6, 38],
    starThresholds: {
      three: 11,
      two: { min: 12, max: 13 },
      one: { min: 14, max: 15 }
    }
  }
};

// Helper to get level by ID
export function getLevel(levelId: string): Level | undefined {
  return LEVELS[levelId];
}

// Get all level IDs in order
export const LEVEL_ORDER = [
  'level-1', 'level-2', 'level-3', 'level-4',
  'level1', 'level2', 'level3', 'level4', 'level5',
  'level6', 'level7', 'level8', 'level9', 'level10',
  'level11', 'level12', 'level13', 'level14', 'level15',
  'level16', 'level17', 'level18', 'level19', 'level20',
  'level21', 'level22', 'level23', 'level24', 'level25',
  'level26', 'level27', 'level28', 'level29', 'level30'
];
