# Number Locks - React + TypeScript + Capacitor

A modern rebuild of the Number Locks puzzle game using React, TypeScript, and Capacitor for cross-platform deployment (Web, Android, iOS).

## About

Number Locks is a challenging puzzle game where players swipe numbered tiles to subtract them from each other, with the goal of clearing all tiles from the board. The game features:

- 30 progressive levels across 3 vaults
- Tutorial system for new players
- Star/key-based progression system
- Sound effects and haptic feedback
- Offline PWA support
- Cross-platform (Web, Android, iOS)

## Technology Stack

### Core Technologies
- **React 18** - Modern UI framework
- **TypeScript 5** - Type-safe development
- **Vite 5** - Lightning-fast build tool
- **Capacitor 6** - Native mobile bridge

### State Management & Data
- **Zustand 4** - Lightweight state management with persistence
- **localStorage** - Progress and settings persistence
- **CSS Modules** - Scoped component styling

### UI & Animations
- **Framer Motion 11** - Smooth animations and transitions
- **@use-gesture/react** - 8-directional swipe detection

### Native Features (via Capacitor)
- **@capacitor/haptics** - Haptic feedback
- **@capacitor/status-bar** - Status bar customization
- **@capacitor/splash-screen** - Launch screen
- **@capacitor/screen-orientation** - Portrait lock

### PWA Support
- **vite-plugin-pwa** - Progressive Web App features
- **Workbox** - Offline caching strategies

### Development Tools
- **Vitest** - Fast unit testing
- **ESLint** - Code linting
- **TypeScript strict mode** - Full type safety

## Project Structure

```
numberlocks-react/
├── public/                 # Static assets
│   ├── audio/             # Sound effects
│   ├── img/               # Images and icons
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/
│   │   ├── Game/          # Game board components
│   │   ├── Modals/        # Modal dialogs
│   │   ├── Screens/       # App screens
│   │   └── ErrorBoundary.tsx
│   ├── config/
│   │   ├── levels.ts      # All 30 level definitions
│   │   ├── constants.ts   # Game constants
│   │   ├── admob.config.ts
│   │   └── analytics.config.ts
│   ├── hooks/
│   │   └── useSwipeGesture.ts
│   ├── services/
│   │   ├── AudioService.ts
│   │   ├── HapticsService.ts
│   │   ├── AnalyticsService.ts
│   │   ├── AdMobService.ts
│   │   └── CapacitorService.ts
│   ├── store/
│   │   ├── gameStore.ts       # Current game state
│   │   ├── progressStore.ts   # Player progress
│   │   ├── settingsStore.ts   # App settings
│   │   └── navigationStore.ts # Screen navigation
│   ├── types/
│   │   ├── game.types.ts
│   │   └── level.types.ts
│   ├── utils/
│   │   ├── gameLogic.ts       # Core game mechanics
│   │   └── starCalculator.ts  # Star rating system
│   ├── App.tsx
│   └── main.tsx
├── capacitor.config.ts    # Capacitor configuration
├── vite.config.ts         # Vite build configuration
└── MIGRATION_PLAN.md      # Full migration documentation
```

## Getting Started

### Prerequisites

- **Node.js** 18+ (20+ recommended)
- **npm** 10+
- For mobile builds:
  - **Android Studio** (for Android)
  - **Xcode** (for iOS, macOS only)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ap0894/numberlocks-react.git
cd numberlocks-react
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle to `dist/`
- `npm run preview` - Preview production build locally
- `npm run test` - Run unit tests with Vitest
- `npm run lint` - Run ESLint

## Development

### Running Locally (Web)

```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:5173`.

### Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### TypeScript Type Checking

```bash
npx tsc --noEmit
```

## Building for Production

### Web Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with:
- Minified JavaScript and CSS
- Tree-shaken dependencies
- Service worker for offline support
- PWA manifest

### Preview Production Build

```bash
npm run preview
```

## Mobile Deployment

### Android

1. Build the web app:
```bash
npm run build
```

2. Sync with Capacitor:
```bash
npx cap sync android
```

3. Open in Android Studio:
```bash
npx cap open android
```

4. Build and run from Android Studio, or use:
```bash
npx cap run android
```

### iOS

1. Build the web app:
```bash
npm run build
```

2. Sync with Capacitor:
```bash
npx cap sync ios
```

3. Open in Xcode:
```bash
npx cap open ios
```

4. Build and run from Xcode, or use:
```bash
npx cap run ios
```

## Deployment

### Web (GitHub to Webhost)

1. Push to GitHub:
```bash
git add .
git commit -m "Build production version"
git push origin main
```

2. Configure your webhost to pull from GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Google Play Store (Android)

1. Open project in Android Studio
2. Build > Generate Signed Bundle / APK
3. Follow Google Play Console upload process

### Apple App Store (iOS)

1. Open project in Xcode
2. Product > Archive
3. Follow App Store Connect upload process

## Game Architecture

### State Management

The game uses Zustand for state management with three main stores:

1. **gameStore** - Current game session (tiles, moves, stars)
2. **progressStore** - Player progress (levels completed, total stars)
3. **settingsStore** - App settings (sound, etc.)
4. **navigationStore** - Screen navigation state

All stores use Zustand persist middleware for automatic localStorage synchronization.

### Game Logic

Core game mechanics in `src/utils/gameLogic.ts`:

- **Tile Movement** - Calculate target position based on swipe direction
- **Subtraction** - `Math.abs(tile1 - tile2)`
- **Pair Detection** - Find adjacent matching numbers
- **Game Over Detection** - Identify isolated tiles (no valid moves)
- **Diagonal Support** - Unlocked at level 11

### Star Rating System

Located in `src/utils/starCalculator.ts`:

- 3 stars: Minimum moves
- 2 stars: Medium range
- 1 star: Maximum range
- Supports range thresholds (e.g., "12-13" moves)

### Swipe Detection

`src/hooks/useSwipeGesture.ts`:

- 8-directional swipe support (up, down, left, right, diagonals)
- 4-directional mode for levels 1-10
- Configurable threshold and velocity
- Uses @use-gesture/react

## PWA Features

The app is a Progressive Web App with:

- **Offline Support** - Play without internet connection
- **Install Prompt** - Add to home screen
- **App Manifest** - Native-like experience
- **Service Worker** - Asset caching with Workbox
- **Responsive Design** - Works on all screen sizes

## Migration from Legacy App

This is a complete rewrite of the original Cordova/jQuery app. See [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) for full details on the migration process, architecture decisions, and progress.

### Key Improvements

- ✅ Modern React architecture (vs. jQuery)
- ✅ TypeScript for type safety (vs. vanilla JS)
- ✅ Capacitor for native features (vs. Cordova)
- ✅ Zustand for state management (vs. global variables)
- ✅ Framer Motion for animations (vs. jQuery.animate)
- ✅ Vite for fast builds (vs. no build system)
- ✅ Component-based architecture
- ✅ PWA support for web
- ✅ Automatic progress migration from old app

## Browser Support

- **Chrome/Edge** 90+
- **Firefox** 88+
- **Safari** 14+
- **Mobile Safari** 14+
- **Chrome Mobile** 90+

## Contributing

This is a personal project migration. For issues or suggestions, please open a GitHub issue.

## License

See [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Original Number Locks game concept
- Icons from Material Design Icons
- Sound effects from original game

---

**Repository:** https://github.com/ap0894/numberlocks-react
**Original Legacy App:** https://github.com/ap0894/numberlocks
**Migration Documentation:** [MIGRATION_PLAN.md](./MIGRATION_PLAN.md)
