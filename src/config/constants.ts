import { TutorialLesson } from '../types/level.types';
import { Vault } from '../types/game.types';

// Tutorial constants
export const FIRST_TIME_TITLE = 'TUTORIAL';
export const FIRST_TIME_TUTORIAL = 'First time playing?<br />Take a quick tutorial and learn the basics';

export const TUTORIAL_LESSONS: TutorialLesson[] = [
  {
    id: 'lesson1',
    title: 'LESSON 1: SUBTRACTION',
    text: 'Swipe tiles to subtract them from each other',
    level: 'level-1'
  },
  {
    id: 'lesson2',
    title: 'LESSON 2.1: NO NEGATIVES',
    text: 'Subtract in either direction, the result is the same.',
    level: 'level-2'
  },
  {
    id: 'lesson2.2',
    title: 'LESSON 2.2: <span style="color:#03dbd6">GREEN TILES</span>',
    text: 'Hint: <span style="color:#03dbd6">green tiles</span>, clear both tiles with 1 move. <p><br />Careful: It\'s not <i>always</i> the right move</p>',
    level: 'level-2',
    isDynamic: true // This lesson shows automatically when pairs are detected
  },
  {
    id: 'lesson3',
    title: 'LESSON 3: VERTICAL',
    text: 'Swipe horizontally or vertically',
    level: 'level-3'
  },
  {
    id: 'lesson4',
    title: 'LESSON 4: KEYS',
    text: 'Less moves = More keys!<br />Keys unlock new levels!',
    level: 'level-4'
  }
];

// Game completion messages
export const GAME_COMPLETE_HEADER = "CONGRATULATIONS YOU'VE FINISHED EVERY LEVEL!";
export const GAME_COMPLETE_TEXT = "<p>Now try for 3 keys on every level!</p><p>Also, look out for our new release with even harder levels and multi-player games</p>";

// Level-specific tutorials
export const LEVEL_2B_TUTORIAL = "Matching adjacent numbers turn green as visual clue that one swipe will eliminate both tiles. Be careful though, it isn't always the right move";
export const LEVEL_11_TUTORIAL = "You can swipe diagonally";
export const ISOLATED_TILE_TUTORIAL = "You've isolated a square, which means you can't complete the level. We recommend hitting the restart button";

// Congratulations messages
export const CONGRATS_TITLE = "GREAT JOB!";
export const CONGRATS_TEXT = "Ready for the next lesson?";

// Game explanation
export const GAME_EXPLANATION = "How to play: swipe tiles to subtract from each other. End up with 0 to get to next level";

// Vaults configuration
export const VAULTS: Vault[] = [
  {
    id: 1,
    name: 'Subtract',
    requiredStars: 3,
    levels: ['level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8', 'level9', 'level10']
  },
  {
    id: 2,
    name: 'Diagonal',
    requiredStars: 21,
    levels: ['level11', 'level12', 'level13', 'level14', 'level15', 'level16', 'level17', 'level18', 'level19', 'level20']
  },
  {
    id: 3,
    name: '4x4',
    requiredStars: 50,
    levels: ['level21', 'level22', 'level23', 'level24', 'level25', 'level26', 'level27', 'level28', 'level29', 'level30']
  }
];

// Grid constants
export const TILE_SIZE = 40; // pixels
export const ANIMATION_DURATION = 250; // milliseconds

// Diagonal unlocking
export const DIAGONAL_UNLOCK_LEVEL = 11; // Level number where diagonal swipes are enabled
