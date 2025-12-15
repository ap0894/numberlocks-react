import {useDrag} from '@use-gesture/react';
import {SwipeDirection} from '../types/level.types';

interface SwipeConfig {
  onSwipe: (direction: SwipeDirection) => void;
  enableDiagonal?: boolean;
  threshold?: number;
  velocity?: number;
}

/**
 * Custom hook for detecting swipe gestures in 8 directions
 * Migrated from Hammer.js angle-based detection (index.js:1520-1541)
 */
export function useSwipeGesture({
  onSwipe,
  enableDiagonal = false,
  threshold = 5,
  velocity = 0.05
}: SwipeConfig) {
    return useDrag(
      ({movement: [mx, my], velocity: [vx, vy], last, cancel}) => {
          // Only process on gesture end
          if (!last) return;

          // Check if movement exceeds minimum threshold
          const distance = Math.sqrt(mx * mx + my * my);
          if (distance < threshold) {
              cancel();
              return;
          }

          // More lenient velocity check - accept if either distance is good OR velocity is good
          const totalVelocity = Math.sqrt(vx * vx + vy * vy);
          const hasGoodDistance = distance >= threshold * 3;
          const hasGoodVelocity = totalVelocity >= velocity;

          // Require either sufficient distance OR sufficient velocity
          if (!hasGoodDistance && !hasGoodVelocity) {
              cancel();
              return;
          }

          // Calculate angle in degrees
          // atan2 returns angle from -180 to 180
          const angle = Math.atan2(my, mx) * (180 / Math.PI);

          let direction: SwipeDirection;

          if (enableDiagonal) {
              // 8-directional detection (matching index.js:1526-1541)
              if (angle > -157.5 && angle < -112.5) {
                  direction = 'upleft';
              } else if (angle > -67.5 && angle < -22.5) {
                  direction = 'upright';
              } else if (angle > 22.5 && angle < 67.5) {
                  direction = 'downright';
              } else if (angle > 112.5 && angle < 157.5) {
                  direction = 'downleft';
              } else if (Math.abs(mx) > Math.abs(my)) {
                  // Horizontal swipe
                  direction = mx > 0 ? 'right' : 'left';
              } else {
                  // Vertical swipe
                  direction = my > 0 ? 'down' : 'up';
              }
          } else {
              // 4-directional detection (levels 1-10)
              if (Math.abs(mx) > Math.abs(my)) {
                  // Horizontal swipe
                  direction = mx > 0 ? 'right' : 'left';
              } else {
                  // Vertical swipe
                  direction = my > 0 ? 'down' : 'up';
              }
          }

          onSwipe(direction);
      },
      {
          // Gesture configuration
          filterTaps: true, // Don't trigger on taps
          preventScroll: true, // Prevent scrolling while swiping
          axis: undefined, // Allow all directions
          pointer: {touch: true, mouse: true} // Enable both touch and mouse
      }
  );
}

/**
 * Get opposite direction (for visual feedback)
 */
export function getOppositeDirection(direction: SwipeDirection): SwipeDirection {
  const opposites: Record<SwipeDirection, SwipeDirection> = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left',
    upleft: 'downright',
    upright: 'downleft',
    downleft: 'upright',
    downright: 'upleft'
  };
  return opposites[direction];
}

/**
 * Convert direction to CSS transform for animations
 */
export function directionToTransform(
  direction: SwipeDirection,
  distance: number = 100
): string {
  const transforms: Record<SwipeDirection, string> = {
    up: `translateY(-${distance}px)`,
    down: `translateY(${distance}px)`,
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    upleft: `translate(-${distance}px, -${distance}px)`,
    upright: `translate(${distance}px, -${distance}px)`,
    downleft: `translate(-${distance}px, ${distance}px)`,
    downright: `translate(${distance}px, ${distance}px)`
  };
  return transforms[direction];
}
