import type { Config } from "tailwindcss";
const colors = require('./src/constants/colors.ts');
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens:{
        'xxl': {'min': '1728px'},
           
        'xs': {'min': '430px', 'max': '640px'},
           
      },
      colors:{
        ...colors,
      },
      fontFamily:{
        Inter: ['Inter']
      },
      boxShadow: {
        'custom': '0px 4px 10px rgba(0, 0, 0, 0.1)',
        'custom-drop-shadow': '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
      },
      animation: {
        text: 'text 100s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      backgroundImage: {
        'swirl-pattern': "url('/assets/images/swirl_bg.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
