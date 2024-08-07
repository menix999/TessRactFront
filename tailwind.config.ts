import type { Config } from 'tailwindcss';

const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    "./node_modules/flowbite/**/*.js",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'main-purple': '#4153EF',
        'main-purple-hover': '#3644C4',
        'main-gray-hover': '#F5F5F5',
        'main-gray': '#B0B0B0',
        'dashboard-background-gray': '#FAFAFA',
        'secondary-gray': '#686868',
        'main-error-red': '#DF0423',
        'title-gray': '#4D4D4D',
        'google-gradient': '#C1C1C1',
        'google-content': '#0E435C',
        'main-green': '#32CD32',
        'category-background': '#FBFBFB',
        'table-background': '#FCFCFC',

        'dashboard-watch-background': '#EFEFEF',
        'dashboard-watch-title': '#333333',
        'dashboard-watch-text': '#737373',
        'toastify-description': '#eaeaea',

        'status-new': '#4CAF50',
        // 'status-inprogress': '#03A9F4',
        // 'status-sent': '#9C27B0',
      },
    },
    screens: {
      xs: '400px',
      ...defaultTheme.screens,
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
export default config;
