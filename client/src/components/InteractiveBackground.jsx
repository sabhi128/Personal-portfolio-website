import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const InteractiveBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    // Smooth spring animation for cursor following
    const springConfig = { damping: 25, stiffness: 100 };
    const mouseXSpring = useSpring(0, springConfig);
    const mouseYSpring = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Normalize to -1 to 1 range
            const x = (clientX / innerWidth - 0.5) * 2;
            const y = (clientY / innerHeight - 0.5) * 2;

            setMousePosition({ x: clientX, y: clientY });
            mouseXSpring.set(x);
            mouseYSpring.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseXSpring, mouseYSpring]);

    // Transform mouse position to movement values
    const orb1X = useTransform(mouseXSpring, [-1, 1], [-100, 100]);
    const orb1Y = useTransform(mouseYSpring, [-1, 1], [-80, 80]);

    const orb2X = useTransform(mouseXSpring, [-1, 1], [80, -80]);
    const orb2Y = useTransform(mouseYSpring, [-1, 1], [60, -60]);

    const orb3X = useTransform(mouseXSpring, [-1, 1], [-50, 50]);
    const orb3Y = useTransform(mouseYSpring, [-1, 1], [-100, 100]);

    return (
        <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Primary gradient orb - follows cursor */}
            <motion.div
                style={{ x: orb1X, y: orb1Y }}
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]"
            />

            {/* Secondary orb - inverse movement */}
            <motion.div
                style={{ x: orb2X, y: orb2Y }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[130px]"
            />

            {/* Third orb - subtle movement */}
            <motion.div
                style={{ x: orb3X, y: orb3Y }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[120px]"
            />

            {/* Cursor glow - direct follow */}
            <motion.div
                animate={{
                    x: mousePosition.x - 150,
                    y: mousePosition.y - 150
                }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="absolute w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]"
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
            }} />

            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }} />
        </div>
    );
};

export default InteractiveBackground;
