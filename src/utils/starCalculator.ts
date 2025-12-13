import { LEVELS } from '../config/levels';

/**
 * Calculate star rating based on number of moves
 * Migrated from js/index.js:225-244
 */
export function calculateStars(moves: number, levelId: string): number {
  const level = LEVELS[levelId];
  if (!level) {
    console.error(`Level ${levelId} not found`);
    return 0;
  }

  const { three, two, one } = level.starThresholds;

  // Parse threshold values (handle ranges like "12-13")
  const threeVal = typeof three === 'number' ? three : three;
  const twoMin = typeof two === 'number' ? two : two.min;
  const twoMax = typeof two === 'number' ? two : two.max;
  const oneMin = typeof one === 'number' ? one : one.min;

  // Edge case: two === three (from index.js:227-233)
  // This happens in some levels where 2-star and 3-star thresholds are the same
  if (twoMin === threeVal) {
    // If moves are in the "one star" range, give 1 star
    if (moves > twoMax && moves <= oneMin) {
      return 1;
    }
    // Otherwise give 3 stars
    return 3;
  }

  // Standard calculation (from index.js:235-243)
  if (moves <= threeVal) {
    return 3; // 3 stars
  }

  if (moves >= twoMin && moves <= twoMax) {
    return 2; // 2 stars
  }

  if (moves > twoMax) {
    return 1; // 1 star
  }

  // Default to 3 stars if moves are very low
  return 3;
}

/**
 * Get star thresholds for a level (for UI display)
 */
export function getStarThresholds(levelId: string): {
  three: number;
  two: { min: number; max: number };
  one: { min: number; max: number };
} | null {
  const level = LEVELS[levelId];
  if (!level) return null;

  const { three, two, one } = level.starThresholds;

  return {
    three: typeof three === 'number' ? three : three,
    two:
      typeof two === 'number'
        ? { min: two, max: two }
        : { min: two.min, max: two.max },
    one:
      typeof one === 'number'
        ? { min: one, max: one }
        : { min: one.min, max: one.max }
  };
}

/**
 * Check if current moves qualify for a specific star rating
 */
export function qualifiesForStars(moves: number, levelId: string, stars: 1 | 2 | 3): boolean {
  const currentStars = calculateStars(moves, levelId);
  return currentStars >= stars;
}
