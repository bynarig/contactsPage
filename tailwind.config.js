wind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "color-scheme": "light",
          "primary": "oklch(57% 0.245 27.325)",
          "primary-content": "oklch(93% 0.034 272.788)",
          "secondary": "oklch(64% 0.222 41.116)",
          "secondary-content": "oklch(94% 0.028 342.258)",
          "accent": "oklch(87% 0.169 91.605)",
          "accent-content": "oklch(38% 0.063 188.416)",
          "neutral": "oklch(39% 0.141 25.723)",
          "neutral-content": "oklch(92% 0.004 286.32)",
          "base-100": "oklch(100% 0 0)",
          "base-200": "oklch(98% 0 0)",
          "base-300": "oklch(98% 0.001 106.423)",
          "base-content": "oklch(21% 0.006 285.885)",
          "info": "oklch(74% 0.16 232.661)",
          "info-content": "oklch(29% 0.066 243.157)",
          "success": "oklch(76% 0.177 163.223)",
          "success-content": "oklch(37% 0.077 168.94)",
          "warning": "oklch(82% 0.189 84.429)",
          "warning-content": "oklch(41% 0.112 45.904)",
          "error": "oklch(71% 0.194 13.428)",
          "error-content": "oklch(27% 0.105 12.094)",
        },
        // You can add additional themes like dark here
      }
    ],
  },
}