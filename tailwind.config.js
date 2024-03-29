/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'text': {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        'background': {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        'primary': {
          50: '#eafaf1',
          100: '#d6f5e3',
          200: '#adebc7',
          300: '#84e1ab',
          400: '#5bd78f',
          500: '#32cd73',
          600: '#28a45c',
          700: '#1e7b45',
          800: '#14522e',
          900: '#0a2917',
          950: '#05150b',
        },
        'secondary': {
          50: '#f0f5f2',
          100: '#e1eae4',
          200: '#c2d6ca',
          300: '#a4c1af',
          400: '#86ac94',
          500: '#67987a',
          600: '#537961',
          700: '#3e5b49',
          800: '#293d31',
          900: '#151e18',
          950: '#0a0f0c',
        },
        'accent': {
          50: '#ffe5e6',
          100: '#ffcccd',
          200: '#ff999b',
          300: '#ff6669',
          400: '#ff3336',
          500: '#ff0004',
          600: '#cc0003',
          700: '#990003',
          800: '#660002',
          900: '#330001',
          950: '#1a0000',
        },
       },
    }
  },
  plugins: []
}
