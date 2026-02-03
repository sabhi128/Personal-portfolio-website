/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    DEFAULT: '#0a0a0a',
                    100: '#111111',
                    200: '#1a1a1a',
                    300: '#222222',
                },
                accent: {
                    DEFAULT: '#60a5fa',
                    purple: '#a78bfa',
                    green: '#4ade80',
                },
                muted: '#888888',
            },
            fontFamily: {
                display: ['Space Grotesk', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'fade-up': 'fadeUp 0.6s ease-out forwards',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-in': 'slideIn 0.5s ease-out forwards',
                'scale-in': 'scaleIn 0.3s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(96, 165, 250, 0.3)' },
                    '100%': { boxShadow: '0 0 40px rgba(96, 165, 250, 0.6)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)',
            },
        },
    },
    plugins: [],
}
