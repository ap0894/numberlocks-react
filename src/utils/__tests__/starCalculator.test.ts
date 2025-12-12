import { describe, it, expect } from 'vitest';
import { calculateStars, getStarThresholds, qualifiesForStars } from '../starCalculator';

describe('starCalculator', () => {
  describe('calculateStars', () => {
    it('should calculate 3 stars for perfect moves', () => {
      // level1: three=6, two=7, one=8
      expect(calculateStars(6, 'level1')).toBe(3);
      expect(calculateStars(5, 'level1')).toBe(3);
      expect(calculateStars(1, 'level1')).toBe(3);
    });

    it('should calculate 2 stars for good moves', () => {
      // level1: three=6, two=7, one=8
      expect(calculateStars(7, 'level1')).toBe(2);
    });

    it('should calculate 1 star for acceptable moves', () => {
      // level1: three=6, two=7, one=8
      expect(calculateStars(8, 'level1')).toBe(1);
      expect(calculateStars(9, 'level1')).toBe(1);
      expect(calculateStars(100, 'level1')).toBe(1);
    });

    it('should handle range thresholds', () => {
      // level12: three=5, two=6, one=7-8 (range)
      expect(calculateStars(5, 'level12')).toBe(3);
      expect(calculateStars(6, 'level12')).toBe(2);
      expect(calculateStars(7, 'level12')).toBe(1);
      expect(calculateStars(8, 'level12')).toBe(1);
    });

    it('should handle edge case where two === three', () => {
      // level6: three=7, two=7, one=8
      expect(calculateStars(7, 'level6')).toBe(3);
      expect(calculateStars(8, 'level6')).toBe(1);
      expect(calculateStars(6, 'level6')).toBe(3);
    });

    it('should handle 4x4 levels with range thresholds', () => {
      // level21: three=11, two=12-13, one=14-15
      expect(calculateStars(11, 'level21')).toBe(3);
      expect(calculateStars(12, 'level21')).toBe(2);
      expect(calculateStars(13, 'level21')).toBe(2);
      expect(calculateStars(14, 'level21')).toBe(1);
      expect(calculateStars(15, 'level21')).toBe(1);
    });

    it('should return 0 for invalid level', () => {
      expect(calculateStars(5, 'invalidLevel')).toBe(0);
    });
  });

  describe('getStarThresholds', () => {
    it('should return thresholds for simple levels', () => {
      const thresholds = getStarThresholds('level1');
      expect(thresholds).toEqual({
        three: 6,
        two: { min: 7, max: 7 },
        one: { min: 8, max: 8 }
      });
    });

    it('should return thresholds for levels with ranges', () => {
      const thresholds = getStarThresholds('level21');
      expect(thresholds).toEqual({
        three: 11,
        two: { min: 12, max: 13 },
        one: { min: 14, max: 15 }
      });
    });

    it('should return null for invalid level', () => {
      expect(getStarThresholds('invalidLevel')).toBeNull();
    });
  });

  describe('qualifiesForStars', () => {
    it('should check if moves qualify for specific star rating', () => {
      // level1: three=6, two=7, one=8
      expect(qualifiesForStars(6, 'level1', 3)).toBe(true);
      expect(qualifiesForStars(6, 'level1', 2)).toBe(true);
      expect(qualifiesForStars(6, 'level1', 1)).toBe(true);

      expect(qualifiesForStars(7, 'level1', 3)).toBe(false);
      expect(qualifiesForStars(7, 'level1', 2)).toBe(true);
      expect(qualifiesForStars(7, 'level1', 1)).toBe(true);

      expect(qualifiesForStars(8, 'level1', 3)).toBe(false);
      expect(qualifiesForStars(8, 'level1', 2)).toBe(false);
      expect(qualifiesForStars(8, 'level1', 1)).toBe(true);
    });
  });
});
