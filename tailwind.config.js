export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0a0a1a',
        'space-blue': '#9423E7',    // Actualizado a #9423E7
        'space-purple': '#5912A6',  // Actualizado a #5912A6
        'space-cyan': '#E17FCD',    // Actualizado a #E17FCD
        'neon-blue': '#F8ACCD',     // Actualizado a #F8ACCD
        'neon-purple': '#C968D5',   // Actualizado a #C968D5
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(248, 172, 205, 0.5)' },  // Actualizado con color #F8ACCD
          '100%': { boxShadow: '0 0 20px rgba(148, 35, 231, 0.8), 0 0 30px rgba(201, 104, 213, 0.6)' },  // Actualizado con colores #9423E7 y #C968D5
        },
      },
    },
  },
  plugins: [],
}