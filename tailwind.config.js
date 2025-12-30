/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Primary - Neon Green
        primary: {
          50: '#E8FFF0',
          100: '#C6FFD9',
          200: '#A0FFBF',
          300: '#6DFFA0',
          400: '#3DFF80',
          500: '#00FF6A',
          600: '#00E05E',
          700: '#00C252',
          800: '#00A346',
          900: '#007A35',
          DEFAULT: '#00FF6A',
        },
        // Dark theme backgrounds - Greenish dark tones
        dark: {
          900: '#0D1F17',
          800: '#0F2319',
          700: '#13291E',
          600: '#172F23',
          500: '#1B3528',
          400: '#1F3B2D',
          300: '#244132',
          200: '#2A4838',
          100: '#30503E',
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
          DEFAULT: '#2196F3',
        },
        // Accent - Yellow/Gold (energy, points)
        accent: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFD700',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
          DEFAULT: '#FFD700',
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
        'card-elevated': '#172F23',
        border: '#1B3528',
        'border-light': '#244132',
        // Text
        'text-primary': '#FFFFFF',
        'text-secondary': '#9CA3AF',
        'text-tertiary': '#6B7280',
        'text-muted': '#4B5563',
        'text-green': '#00FF6A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      spacing: {
        '18': '72px',
        '88': '352px',
      },
    },
  },
  plugins: [],
};
