import { useEffect, useRef } from 'react';
import Hammer from 'hammerjs';
import { SwipeDirection } from '../types/level.types';

interface UseHammerSwipeProps {
    onSwipe: (direction: SwipeDirection) => void;
    enableDiagonal?: boolean;
}

export function useHammerSwipe({ onSwipe, enableDiagonal = false }: UseHammerSwipeProps) {
    const tileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!tileRef.current) return;

        const hammer = new Hammer(tileRef.current);

        hammer.get('swipe').set({
            direction: enableDiagonal
                ? Hammer.DIRECTION_ALL
                : Hammer.DIRECTION_HORIZONTAL | Hammer.DIRECTION_VERTICAL,
            threshold: 5,
            velocity: 0.2,
        });

        hammer.on('swipe', (e) => {
            let dir: SwipeDirection;

            switch (e.direction) {
                case Hammer.DIRECTION_LEFT: dir = 'left'; break;
                case Hammer.DIRECTION_RIGHT: dir = 'right'; break;
                case Hammer.DIRECTION_UP: dir = 'up'; break;
                case Hammer.DIRECTION_DOWN: dir = 'down'; break;
                case Hammer.DIRECTION_UP | Hammer.DIRECTION_LEFT: dir = 'upleft'; break;
                case Hammer.DIRECTION_UP | Hammer.DIRECTION_RIGHT: dir = 'upright'; break;
                case Hammer.DIRECTION_DOWN | Hammer.DIRECTION_LEFT: dir = 'downleft'; break;
                case Hammer.DIRECTION_DOWN | Hammer.DIRECTION_RIGHT: dir = 'downright'; break;
                default: return;
            }

            onSwipe(dir);
        });

        return () => hammer.destroy();
    }, [onSwipe, enableDiagonal]);

    return tileRef;
}
