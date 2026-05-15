/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk Variable', 'Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f7f7f8',
          100: '#ededee',
          200: '#d9d9dc',
          300: '#b6b6bc',
          400: '#8b8b94',
          500: '#6d6d76',
          600: '#55555c',
          700: '#3f3f44',
          800: '#26262a',
          900: '#161618',
          950: '#0a0a0c',
        },
        brand: {
          50: '#f3f1ff',
          100: '#e9e5ff',
          200: '#d5cdff',
          300: '#b5a5ff',
          400: '#9275ff',
          500: '#7548ff',
          600: '#6628ff',
          700: '#5719e5',
          800: '#4815b9',
          900: '#3c1495',
          950: '#220763',
        },
        accent: {
          DEFAULT: '#d8ff3a',
          soft: '#eaff7d',
        },
      },
      boxShadow: {
        'glow': '0 0 0 1px rgba(117, 72, 255, 0.2), 0 20px 60px -10px rgba(117, 72, 255, 0.25)',
        'soft': '0 6px 24px -6px rgba(20, 20, 30, 0.12)',
      },
      backgroundImage: {
        'grid-light': "linear-gradient(to right, rgba(20,20,30,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,30,0.04) 1px, transparent 1px)",
        'grid-dark': "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'shimmer': 'shimmer 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
    },
  },
  plugins: [],
};
