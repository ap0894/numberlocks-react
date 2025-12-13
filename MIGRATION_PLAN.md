# Number Locks - Migration Plan

## Overview

Migration of the legacy Number Locks Cordova/jQuery mobile game to a modern **React + TypeScript + Capacitor** architecture supporting Android, iOS, and Web platforms.

**Original Repository:** [numberlocks](https://github.com/ap0894/numberlocks) (legacy Cordova app)
**New Repository:** [numberlocks-react](https://github.com/ap0894/numberlocks-react) (modern React app)

---

## Technology Decisions

### Core Stack
- **React 18** - Modern UI framework
- **TypeScript 5** - Type safety and better DX
- **Vite 5** - Fast build tool (replacing no build system)
- **Capacitor 6** - Native bridge (replacing Cordova)

### State Management
- **Zustand 4** with persist middleware and devtools
- Chosen over Redux Toolkit for simplicity and smaller bundle size
- Three stores: gameStore, progressStore, settingsStore

### Gesture Handling
- **@use-gesture/react** - 8-directional swipe detection (replacing Hammer.js)
- Supports both 4-directional (levels 1-10) and 8-directional (levels 11+) swipes

### Animations
- **Framer Motion 11** - Tile movements, transitions, game feedback
- Decided NOT to use Phaser.io (overkill for simple grid puzzle mechanics)

### Styling
- **CSS Modules** - Scoped component styles
- Preserves original game's visual design (gradients, colors, fonts)

### Testing
- **Vitest** - Fast unit testing
- **React Testing Library** - Component testing
- Focus on testing core game logic and state management

### PWA & Offline
- **vite-plugin-pwa** + **Workbox** - Progressive Web App support
- Offline gameplay capability
- App-like experience on web

### Native Features (Capacitor Plugins)
- **@capacitor-community/admob** - Mobile ads
- **@capacitor/app** - App lifecycle events
- **@capacitor/haptics** - Vibration feedback
- **@capacitor/status-bar** - Status bar styling
- **@capacitor/splash-screen** - Launch screen
- **capacitor-firebase-analytics** - Analytics tracking

### Deployment
- **Web:** User's own webhost via GitHub integration (not Netlify)
- **Android:** Google Play Store (via Capacitor build)
- **iOS:** Apple App Store (via Capacitor build)

---

## 5-Week Migration Plan

### ✅ Week 1: Project Setup & Data Migration (COMPLETED)

**Status:** Committed to GitHub on Dec 12, 2024

**Completed Tasks:**
1. ✅ Initialized new repository
2. ✅ Set up Vite + React + TypeScript project structure
3. ✅ Installed dependencies (React, Zustand, Framer Motion, Capacitor, etc.)
4. ✅ Configured Capacitor with app ID: `com.virtualteambuild.numberlocks`
5. ✅ Migrated all 30 level definitions from `js/levels.js` to TypeScript
   - Converted to `src/config/levels.ts`
   - Typed with `Level` interface
   - Handled range thresholds (e.g., "12-13" → `{ min: 12, max: 13 }`)
6. ✅ Created `src/config/constants.ts` with game constants
   - Tile size, colors, diagonal unlock level
   - Tutorial lessons, vault configurations
7. ✅ Copied all assets to `public/` directory
   - Audio files (ding.m4a, lock.m4a, swipe.mp3)
   - Images (backgrounds, icons, splash screens)
   - Fonts (Raleway)
8. ✅ Created config files for native plugins
   - `src/config/admob.config.ts`
   - `src/config/analytics.config.ts`

**Key Files Created:**
- `package.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`
- `capacitor.config.ts`
- `src/config/levels.ts` (1000+ lines)
- `src/config/constants.ts`
- `index.html`, `src/main.tsx`, `src/App.tsx`

---

### ✅ Week 2: State Management & Core Logic (COMPLETED)

**Status:** Committed to GitHub on Dec 12, 2024

**Completed Tasks:**
1. ✅ Created `src/store/gameStore.ts`
   - Current game session state (tiles, moves, stars, level)
   - Integrated with game logic utilities
   - Zustand devtools integration
2. ✅ Created `src/store/progressStore.ts`
   - Player progress persistence (localStorage)
   - Level completion tracking, total stars
   - Migration of old Cordova app data
3. ✅ Created `src/store/settingsStore.ts`
   - Sound effects toggle
   - Other game settings
4. ✅ Implemented `src/utils/gameLogic.ts`
   - Core tile movement logic
   - Tile subtraction (Math.abs)
   - Target position calculation for all 8 directions
   - Pair detection (adjacent matching numbers)
   - Game over detection (isolated tiles)
   - Migrated from `js/index.js:1520-1700`
5. ✅ Implemented `src/utils/starCalculator.ts`
   - Complex star rating algorithm
   - Handles range thresholds correctly
   - Edge case handling (two === three threshold)
   - Migrated from `js/index.js:190-244`
6. ✅ Created comprehensive unit tests
   - `src/utils/__tests__/gameLogic.test.ts` (15+ test cases)
   - `src/utils/__tests__/starCalculator.test.ts` (10+ test cases)
   - Tests for tile movement, subtraction, pairs, game over, star calculation

**Key Migrations:**
- `js/index.js` game logic → `src/utils/gameLogic.ts`
- `js/index.js` star calculation → `src/utils/starCalculator.ts`
- localStorage handling → Zustand persist middleware
- Old Cordova data migration → `progressStore` migrate function

---

### 🔄 Week 3: Components Part 1 - Game Board (IN PROGRESS)

**Status:** In development

**Completed Tasks:**
1. ✅ Created `src/hooks/useSwipeGesture.ts`
   - 8-directional swipe detection using @use-gesture/react
   - Replaces Hammer.js angle-based detection
   - Supports 4-directional mode for levels 1-10
   - Threshold configuration, velocity support
2. ✅ Built `src/components/Game/Tile.tsx` + `.module.css`
   - Individual tile component
   - Framer Motion animations (move, scale, fade)
   - Swipe gesture binding
   - Visual states: default, pairable (green), isolated (red), complete (checkmark)
   - Gradient backgrounds, pulse/shake animations
3. ✅ Created `src/components/Game/Grid.tsx` + `.module.css`
   - Renders background circles for tile positions
   - Dynamic grid size based on tile count
4. ✅ Created `src/components/Game/GridLines.tsx` + `.module.css`
   - Horizontal and vertical guide lines
   - Diagonal lines (shown only for levels 11+)
   - Styled with semi-transparent lines
5. ✅ Built `src/components/Game/TileContainer.tsx` + `.module.css`
   - Manages all tiles with AnimatePresence
   - Handles tile enter/exit animations
   - Passes swipe handlers to tiles
6. ✅ Created `src/components/Game/GameBoard.tsx` + `.module.css`
   - Main game container component
   - Initializes level on mount
   - Combines Grid, GridLines, and TileContainer
   - Determines grid size and diagonal mode
7. ✅ Built `src/components/Game/MovesSlider.tsx` + `.module.css`
   - Custom slider replacing noUiSlider
   - Shows star threshold markers (3-star, 2-star, 1-star positions)
   - Animated current position indicator
   - Current star rating display with key icons
   - Handles range thresholds correctly

**Pending Tasks:**
- ⏳ Update `src/App.tsx` to render GameBoard for testing
- ⏳ Test all components together
- ⏳ Fix any issues discovered
- ⏳ Commit Week 3 to GitHub

**Key Component Hierarchy:**
```
App
└── GameBoard (levelId prop)
    ├── Grid (background circles)
    ├── GridLines (guide lines)
    └── TileContainer
        └── Tile (multiple, with swipe handlers)

Separate: MovesSlider (moves, stars, levelId props)
```

---

### 📋 Week 4: Components Part 2 - Screens & Modals (PLANNED)

**Goals:**
1. Build screen components
   - HomeScreen (title, play button, settings)
   - VaultScreen (vault selection, unlock progress)
   - LevelSelector (carousel of levels, star display)
   - GameScreen (GameBoard + MovesSlider + header/footer)
2. Build modal components
   - GameOverModal (stars earned, replay/next buttons)
   - TutorialModal (tutorial lessons from constants)
   - SettingsModal (sound toggle, future settings)
   - AboutModal (credits, version info)
3. Implement routing/navigation
   - React Router or simple state-based navigation
   - Screen transitions
4. Integrate remaining Capacitor plugins
   - AdMob setup and display
   - Firebase Analytics events
   - App rating prompt
   - Haptic feedback on tile moves
5. Audio system
   - Sound effect manager
   - Respects settings.soundFx flag
   - Preload audio files

**Key Migrations:**
- `index.html` modal HTML → React modal components
- `js/index.js` modal functions → Modal component props
- `js/index.js` screen logic → Screen components
- AdMob integration → Capacitor AdMob plugin

---

### 📋 Week 5: Polish, Testing & Deployment (PLANNED)

**Goals:**
1. End-to-end testing
   - Full gameplay flow testing
   - Tutorial flow testing
   - Vault unlocking progression
   - Data persistence testing
2. Cross-browser testing (web)
   - Chrome, Safari, Firefox
   - Mobile browsers
3. PWA testing
   - Offline functionality
   - Install prompt
   - App manifest
4. Visual polish
   - Animations refinement
   - Responsive design checks
   - Loading states
   - Error handling UI
5. Performance optimization
   - Bundle size analysis
   - Lazy loading
   - Image optimization
6. Accessibility
   - Keyboard navigation (web)
   - Screen reader support where applicable
7. Documentation
   - Update README with new stack
   - Add setup instructions
   - Document deployment process
8. Deployment
   - Web: Deploy to user's webhost via GitHub
   - Create Android build (Capacitor)
   - Create iOS build (Capacitor)
   - Test on real devices

---

## Migration Mapping

### File Structure Comparison

**Old (Cordova):**
```
numberlocks/
├── index.html (main game UI)
├── js/
│   ├── index.js (~1868 lines - ALL game logic)
│   └── levels.js (level definitions)
├── css/
│   └── index.css (all styles)
├── audio/ (sound effects)
└── img/ (images, icons)
```

**New (React + TypeScript):**
```
numberlocks-react/
├── index.html (minimal, mounts React app)
├── src/
│   ├── main.tsx (entry point)
│   ├── App.tsx (root component)
│   ├── components/
│   │   └── Game/
│   │       ├── Tile.tsx
│   │       ├── Grid.tsx
│   │       ├── GridLines.tsx
│   │       ├── TileContainer.tsx
│   │       ├── GameBoard.tsx
│   │       └── MovesSlider.tsx
│   ├── hooks/
│   │   └── useSwipeGesture.ts
│   ├── store/
│   │   ├── gameStore.ts
│   │   ├── progressStore.ts
│   │   └── settingsStore.ts
│   ├── utils/
│   │   ├── gameLogic.ts
│   │   └── starCalculator.ts
│   └── config/
│       ├── levels.ts
│       ├── constants.ts
│       ├── admob.config.ts
│       └── analytics.config.ts
└── public/ (static assets)
```

### Code Migration Tracker

| Old Code | New Location | Status |
|----------|--------------|--------|
| `js/levels.js` | `src/config/levels.ts` | ✅ Migrated |
| `js/index.js:1-100` (init) | `src/main.tsx` | ✅ Migrated |
| `js/index.js:190-244` (star calc) | `src/utils/starCalculator.ts` | ✅ Migrated |
| `js/index.js:1520-1700` (game logic) | `src/utils/gameLogic.ts` | ✅ Migrated |
| `js/index.js:1080-1200` (localStorage) | `src/store/*Store.ts` (persist) | ✅ Migrated |
| `js/index.js` (swipe handler) | `src/hooks/useSwipeGesture.ts` | ✅ Migrated |
| Tile rendering | `src/components/Game/Tile.tsx` | ✅ Migrated |
| Grid rendering | `src/components/Game/Grid.tsx` | ✅ Migrated |
| Grid lines | `src/components/Game/GridLines.tsx` | ✅ Migrated |
| noUiSlider | `src/components/Game/MovesSlider.tsx` | ✅ Migrated |
| Modal system | `src/components/Modals/*.tsx` | ⏳ Week 4 |
| Screen navigation | `src/components/Screens/*.tsx` | ⏳ Week 4 |
| Audio system | `src/utils/audio.ts` | ⏳ Week 4 |
| AdMob integration | Capacitor AdMob plugin | ⏳ Week 4 |

---

## Key Technical Differences

### 1. State Management
**Old:** Global variables + jQuery DOM manipulation
**New:** Zustand stores with React state updates

### 2. Gestures
**Old:** Hammer.js (angle-based swipe detection)
**New:** @use-gesture/react (movement-based swipe detection)

### 3. Animations
**Old:** CSS transitions + jQuery `.animate()`
**New:** Framer Motion declarative animations

### 4. Data Persistence
**Old:** Direct `localStorage` access
**New:** Zustand persist middleware (automatic sync)

### 5. Level Data
**Old:** String thresholds ("12-13" for ranges)
**New:** Typed objects (`{ min: 12, max: 13 }`)

### 6. Grid System
**Old:** CSS classes `.tile-position-{row}-{col}`
**New:** Inline styles with absolute positioning

### 7. Native Features
**Old:** Cordova plugins
**New:** Capacitor plugins

---

## Data Migration Strategy

The `progressStore` includes a `migrate` function that automatically detects and migrates old Cordova app data:

**Old localStorage keys:**
- `tutorialComplete` → `numberlocks-progress.tutorialComplete`
- `level1`, `level2`, etc. → `numberlocks-progress.levelStars`
- `highestLevel` → `numberlocks-progress.highestLevel`
- `totalStars` → `numberlocks-progress.totalStars`
- `soundFx` → `numberlocks-settings.soundEnabled`

This ensures users upgrading from the old app retain their progress.

---

## Testing Strategy

### Unit Tests
- ✅ Game logic (tile movement, subtraction, pairs, game over)
- ✅ Star calculator (all threshold scenarios)
- ⏳ Stores (state updates, persistence)
- ⏳ Hooks (useSwipeGesture)

### Integration Tests
- ⏳ Component interactions (Tile + Grid + GameBoard)
- ⏳ Store + Component integration
- ⏳ Swipe gestures trigger correct state updates

### E2E Tests
- ⏳ Complete game flow (tutorial → levels → vault unlock)
- ⏳ Data persistence across sessions
- ⏳ Modal flows

---

## Deployment Strategy

### Web Deployment
1. Build: `npm run build` (creates `dist/` folder)
2. Deploy `dist/` to user's webhost via GitHub integration
3. PWA features enable offline play and install prompt

### Android Deployment
1. Build: `npm run build`
2. Sync: `npx cap sync android`
3. Open Android Studio: `npx cap open android`
4. Build APK/AAB for Google Play Store

### iOS Deployment
1. Build: `npm run build`
2. Sync: `npx cap sync ios`
3. Open Xcode: `npx cap open ios`
4. Build IPA for Apple App Store

---

## Open Questions / Decisions

1. **Routing:** React Router vs simple state-based navigation?
2. **Level Pack Strategy:** How to handle future level packs/DLC?
3. **Leaderboards:** Add global/social features?
4. **Theming:** Support for multiple color themes?
5. **In-App Purchases:** Monetization beyond ads?

---

## Progress Tracking

**Overall Progress:** ~40% complete (Week 3 of 5)

- ✅ Week 1: Project Setup (100%)
- ✅ Week 2: State & Logic (100%)
- 🔄 Week 3: Game Board Components (90%)
- ⏳ Week 4: Screens & Modals (0%)
- ⏳ Week 5: Polish & Deploy (0%)

---

## Resources

- **Original Repo:** https://github.com/ap0894/numberlocks
- **New Repo:** https://github.com/ap0894/numberlocks-react
- **Capacitor Docs:** https://capacitorjs.com/docs
- **Zustand Docs:** https://zustand-demo.pmnd.rs/
- **Framer Motion:** https://www.framer.com/motion/

---

**Last Updated:** December 13, 2024
**Current Status:** Week 3 - Game Board Components (in progress)
