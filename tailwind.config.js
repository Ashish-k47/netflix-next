/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx}', './src/components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        
        base: {
          950: 'rgb(var(--color-base-950) / <alpha-value>)',
          900: 'rgb(var(--color-base-900) / <alpha-value>)',
          800: 'rgb(var(--color-base-800) / <alpha-value>)',
          700: 'rgb(var(--color-base-700) / <alpha-value>)',
          600: 'rgb(var(--color-base-600) / <alpha-value>)',
        },
        neutral: {
          100: 'rgb(var(--color-neutral-100) / <alpha-value>)',
          200: 'rgb(var(--color-neutral-200) / <alpha-value>)',
          300: 'rgb(var(--color-neutral-300) / <alpha-value>)',
          400: 'rgb(var(--color-neutral-400) / <alpha-value>)',
          500: 'rgb(var(--color-neutral-500) / <alpha-value>)',
        },
        // Accent/gold stay fixed - the crimson + gold marquee palette
        // works against both the dark and light base tones.
        accent: {
          400: '#e2495c',
          500: '#d1293f',
          600: '#b31f34',
        },
        gold: '#e8b34a',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-fade': 'linear-gradient(180deg, rgb(var(--color-base-950) / 0.15) 0%, rgb(var(--color-base-950) / 0.6) 55%, rgb(var(--color-base-950) / 1) 100%)',
        'hero-side': 'linear-gradient(90deg, rgb(var(--color-base-950) / 0.95) 0%, rgb(var(--color-base-950) / 0.5) 45%, rgb(var(--color-base-950) / 0.05) 100%)',
      },
    },
  },
  plugins: [],
}
