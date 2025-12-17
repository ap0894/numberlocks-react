import { useEffect, useRef } from 'react';
import Hammer from 'hammerjs';
import { SwipeDirection } from '../types/level.types';

interface UseHammerSwipeProps {
    onSwipe: (direction: SwipeDirection) => void;
    enableDiagonal?: boolean;
}

/**
 * Hammer.js swipe detection hook
 * Matches original jQuery implementation with angle-based diagonal detection
 */
export function useHammerSwipe({ onSwipe, enableDiagonal = false }: UseHammerSwipeProps) {
    const tileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!tileRef.current) return;

        const hammer = new Hammer(tileRef.current, {
            domEvents: true
        });

        // Match original settings: threshold 0, velocity 0.1, all directions
        hammer.get('swipe').set({
            direction: Hammer.DIRECTION_ALL,
            threshold: 0,
            velocity: 0.1
        });

        const handleSwipe = (e: HammerInput) => {
            let direction: SwipeDirection;

            if (enableDiagonal) {
                // Use angle-based detection for diagonal swipes (levels 11+)
                // Matches original: index.js:1520-1541
                const angle = e.angle;

                if (angle > -157.5 && angle < -112.5) {
                    direction = 'upleft';
                } else if (angle > -67.5 && angle < -22.5) {
                    direction = 'upright';
                } else if (angle > 22.5 && angle < 67.5) {
                    direction = 'downright';
                } else if (angle > 112.5 && angle < 157.5) {
                    direction = 'downleft';
                } else {
                    // Fall back to simple directional detection
                    direction = hammerDirectionToSwipe(e.direction);
                }
            } else {
                // Simple 4-directional detection (levels 1-10)
                direction = hammerDirectionToSwipe(e.direction);
            }

            onSwipe(direction);
        };

        hammer.on('swipe', handleSwipe);

        return () => {
            hammer.off('swipe', handleSwipe);
            hammer.destroy();
        };
    }, [onSwipe, enableDiagonal]);

    return tileRef;
}

/**
 * Convert Hammer direction constant to SwipeDirection
 */
function hammerDirectionToSwipe(direction: number): SwipeDirection {
    switch (direction) {
        case Hammer.DIRECTION_LEFT: return 'left';
        case Hammer.DIRECTION_RIGHT: return 'right';
        case Hammer.DIRECTION_UP: return 'up';
        case Hammer.DIRECTION_DOWN: return 'down';
        default: return 'right'; // fallback
    }
}
