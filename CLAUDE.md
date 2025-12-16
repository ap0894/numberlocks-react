# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev                    # Start development server at localhost:5173
npm run build                  # Build for production (runs tsc + vite build)
npm run preview                # Preview production build locally
npm run test                   # Run all tests with Vitest
npm run lint                   # Run ESLint
npx tsc --noEmit              # Type check without emitting files
```

### Mobile Development (Capacitor)
```bash
# After npm run build, sync and open in native IDEs:
npx cap sync android          # Sync web build to Android
npx cap open android          # Open Android Studio
npx cap run android           # Build and run on Android device/emulator

npx cap sync ios              # Sync web build to iOS
npx cap open ios              # Open Xcode
npx cap run ios               # Build and run on iOS device/simulator
```

### Testing
```bash
npm run test                  # Run tests
npm run test -- --watch       # Watch mode
npm run test -- --coverage    # With coverage report
npm run test -- gameLogic     # Run specific test file
```

## Architecture Overview

### State Management (Zustand)

The app uses **Zustand** with four separate stores, each using `persist` middleware for automatic localStorage synchronization:

1. **gameStore** (`src/store/gameStore.ts`) - Current game session state
   - Manages active tiles, moves, stars, completion status
   - Actions: `initLevel()`, `makeMove()`, `resetLevel()`, `completeLevel()`
   - NOT persisted (session-only)

2. **progressStore** (`src/store/progressStore.ts`) - Player progression data
   - Tracks completed levels, earned stars, unlocked vaults
   - Includes migration logic from legacy Cordova app (see `migrate` function)
   - Persisted to localStorage as `numberlocks-progress`
   - Key actions: `updateLevelProgress()`, `unlockVault()`, `isLevelUnlocked()`

3. **settingsStore** (`src/store/settingsStore.ts`) - App settings
   - Sound effects, haptics, and other user preferences
   - Persisted to localStorage

4. **navigationStore** (`src/store/navigationStore.ts`) - Screen navigation
   - Manages screen history and navigation state
   - Screens: `'home' | 'vaults' | 'levels' | 'game'`
   - NOT persisted (session-only)

### Core Game Logic

Located in `src/utils/gameLogic.ts`:

- **`processTileMove(tiles, tileId, direction)`** - Main game mechanic
  - Calculates target position based on swipe direction
  - Performs subtraction: `Math.abs(tile1 - tile2)`
  - Updates tile positions and values
  - Returns updated tiles and remaining tile count

- **`checkGameOver(tiles, levelId)`** - Detects isolated tiles
  - Checks if any tile has no valid moves (all neighbors are complete)
  - Respects diagonal unlock at level 11 (`DIAGONAL_UNLOCK_LEVEL`)
  - Marks isolated tiles and returns game over status

- **`checkForPairs(tiles)`** - Visual hint system
  - Finds matching adjacent numbers (4-directional only, not diagonal)
  - Marks tiles with `isPair: true` for green highlighting

### Swipe Detection

`src/hooks/useSwipeGesture.ts`:
- Uses `@use-gesture/react` for gesture recognition
- Supports 8 directions: `up`, `down`, `left`, `right`, `upleft`, `upright`, `downleft`, `downright`
- Diagonal swipes disabled for levels 1-10, enabled starting at level 11
- Configurable velocity threshold and swipe distance

### Level Progression System

Defined in `src/config/constants.ts`:

- **3 Vaults** with 10 levels each (30 total)
  - Vault 1 "Subtract": Levels 1-10 (requires 3 stars to unlock)
  - Vault 2 "Diagonal": Levels 11-20 (requires 21 stars, unlocks diagonal swipes)
  - Vault 3 "4x4": Levels 21-30 (requires 50 stars, 4x4 grids)

- **Star Rating**: Calculated in `src/utils/starCalculator.ts` based on move efficiency
  - Each level defines min/max/optimal move counts
  - 3 stars = minimum moves, 2 stars = medium, 1 star = completed but inefficient

### Services Architecture

All services in `src/services/` follow a consistent pattern with platform detection:

- **CapacitorService.ts** - Initializes native plugins only on native platforms
  - Uses `Capacitor.isNativePlatform()` check
  - Lazy imports native plugins to avoid PWA errors
  - Initializes StatusBar, SplashScreen, ScreenOrientation

- **AudioService.ts** - Sound effects management
- **HapticsService.ts** - Haptic feedback (native only)
- **AdMobService.ts** - Ad integration placeholder
- **AnalyticsService.ts** - Analytics placeholder

Pattern: Always check `Capacitor.isNativePlatform()` before using native APIs to ensure PWA compatibility.

### PWA Configuration

Configured in `vite.config.ts` using `vite-plugin-pwa`:
- Service worker with Workbox for offline caching
- Caches all assets: `**/*.{js,css,html,ico,png,svg,jpg,m4a,mp3}`
- Standalone display mode, portrait orientation
- Theme color: `#1f253d`

Build optimization:
- Drops console logs and debuggers in production (`terserOptions`)
- Target: ES2020
- Source maps disabled for production

### Component Structure

- **Screens** (`src/components/Screens/`) - Full-screen views: Home, Vaults, Levels, Game
- **Modals** (`src/components/Modals/`) - Overlays: Tutorial, Level Complete, Game Over
- **Game** (`src/components/Game/`) - Game board components: GameBoard, Tile, TileGrid

### Type System

Core types in `src/types/`:
- `game.types.ts` - GameState, ProgressState, Vault
- `level.types.ts` - Tile, Position, SwipeDirection, TutorialLesson

### Critical Constants

From `src/config/constants.ts`:
- `DIAGONAL_UNLOCK_LEVEL = 11` - When diagonal swipes become available
- `ANIMATION_DURATION = 250` ms - Tile animation timing
- Tutorial levels: `level-1` through `level-4` (always unlocked)

## Important Patterns

### Adding New Levels
1. Define level in `src/config/levels.ts` with tiles array and star thresholds
2. Add to appropriate vault in `VAULTS` array in `constants.ts`
3. Update `LEVEL_ORDER` array in `levels.ts`

### Zustand Store Updates
- Use `set()` for state updates, never mutate state directly
- Use `get()` to access current state within actions
- Persist middleware automatically syncs to localStorage
- DevTools middleware enabled for debugging in browser

### Platform-Specific Code
```typescript
import { Capacitor } from '@capacitor/core';

if (Capacitor.isNativePlatform()) {
  // Native-only code
  const { Haptics } = await import('@capacitor/haptics');
  await Haptics.impact({ style: 'light' });
} else {
  // PWA fallback
}
```

### Migration from Legacy App
The `progressStore` includes automatic migration logic that reads from old localStorage keys (`tutorialComplete`, `highestLevel`, `totalStars`) and converts them to the new Zustand format. This runs once on first load via the `migrate` function in the persist middleware.
