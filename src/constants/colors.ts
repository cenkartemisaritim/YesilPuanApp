export const colors = {
  // Primary - Neon Green
  primary: {
    50: '#E8FFF0',
    100: '#C6FFD9',
    200: '#A0FFBF',
    300: '#6DFFA0',
    400: '#3DFF80',
    500: '#00FF6A', // Main neon green
    600: '#00E05E',
    700: '#00C252',
    800: '#00A346',
    900: '#007A35',
  },

  // Dark theme backgrounds - Greenish dark tones
  dark: {
    900: '#0D1F17',    // Darkest - main background (greenish)
    800: '#0F2319',    // Tab bar background
    700: '#13291E',    // Card backgrounds / elevated surfaces
    600: '#172F23',    // Input backgrounds
    500: '#1B3528',    // Borders, dividers
    400: '#1F3B2D',    // Hover states
    300: '#244132',    // Active states
    200: '#2A4838',    // Highlights
    100: '#30503E',    // Light borders
  },

  // Secondary - Blue (water)
  secondary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },

  // Accent - Yellow/Gold (energy, points)
  accent: {
    50: '#FFF8E1',
    100: '#FFECB3',
    200: '#FFE082',
    300: '#FFD54F',
    400: '#FFCA28',
    500: '#FFD700', // Gold for points
    600: '#FFB300',
    700: '#FFA000',
    800: '#FF8F00',
    900: '#FF6F00',
  },

  // Green Score categories
  score: {
    excellent: '#00FF6A',
    good: '#7FFF00',
    average: '#FFD700',
    poor: '#FF4444',
  },

  // Semantic colors
  success: '#00FF6A',
  warning: '#FFD700',
  error: '#FF4444',
  info: '#00BFFF',

  // Backgrounds (Dark theme - greenish)
  background: '#0D1F17',
  surface: '#0F2319',
  card: '#13291E',
  cardElevated: '#172F23',
  border: '#1B3528',
  borderLight: '#244132',

  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#9CA3AF',
    tertiary: '#6B7280',
    muted: '#4B5563',
    inverse: '#0A0F0D',
    green: '#00FF6A',
  },

  // Gradients (for LinearGradient)
  gradients: {
    primary: ['#00FF6A', '#00C252'],
    card: ['#172F23', '#0F2319'],
    cardGlow: ['rgba(0, 255, 106, 0.15)', 'rgba(0, 255, 106, 0.05)'],
    dark: ['#13291E', '#0D1F17'],
    gold: ['#FFD700', '#FFA500'],
  },

  // Transparent variants
  overlay: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(0, 0, 0, 0.5)',
    green: 'rgba(0, 255, 106, 0.1)',
    greenMedium: 'rgba(0, 255, 106, 0.2)',
  },

  // Standard
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type Colors = typeof colors;

// Helper function to get score color
export function getScoreColor(score: number): string {
  if (score >= 80) return colors.score.excellent;
  if (score >= 60) return colors.score.good;
  if (score >= 40) return colors.score.average;
  return colors.score.poor;
}

// Helper function to get score category
export function getScoreCategory(score: number): {
  key: string;
  label: string;
  color: string;
  emoji: string;
} {
  if (score >= 80) {
    return { key: 'excellent', label: 'Mükemmel', color: colors.score.excellent, emoji: '🏆' };
  }
  if (score >= 60) {
    return { key: 'good', label: 'İyi', color: colors.score.good, emoji: '⭐' };
  }
  if (score >= 40) {
    return { key: 'average', label: 'Ortalama', color: colors.score.average, emoji: '📊' };
  }
  return { key: 'poor', label: 'Düşük', color: colors.score.poor, emoji: '⚠️' };
}

// Helper for gradient arrays
export function getGradient(name: keyof typeof colors.gradients): readonly [string, string, ...string[]] {
  return colors.gradients[name] as readonly [string, string, ...string[]];
}
