/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          deep: '#08192E',
          DEFAULT: '#0D2A4A',
          panel: '#112E52',
          line: '#1B3E63',
        },
        blue: {
          line: '#3E7CB1',
          bright: '#6FB7E8',
          soft: '#A9C4DE',
        },
        paper: {
          DEFAULT: '#EAF3FB',
          dim: '#B7CBE0',
        },
        copper: {
          DEFAULT: '#E0A458',
          bright: '#F0BE7C',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        blueprint:
          'linear-gradient(rgba(111,183,232,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(111,183,232,0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '32px 32px',
        'grid-lg': '96px 96px',
      },
    },
  },
  plugins: [],
};
