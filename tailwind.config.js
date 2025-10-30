export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Project-specific brand colors
        main: '#313178',    // deep indigo (requested)
        primary: '#a1a1ce', // lighter purple (requested)
        secondary: '#FBBF24',
      },
    },
  },
  plugins: [],
}