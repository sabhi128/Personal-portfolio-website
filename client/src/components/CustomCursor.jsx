import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);

    // Spring configuration for smooth follow effect
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        }

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-neon-cyan rounded-full pointer-events-none z-[100] mix-blend-difference"
                style={{
                    translateX: cursorX, // Direct mapping for immediate response
                    translateY: cursorY,
                    x: -8, // Center offset
                    y: -8
                }}
                animate={{
                    scale: isHovering ? 2.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[100] mix-blend-difference"
                style={{
                    translateX: cursorXSpring, // Spring physics for the trail
                    translateY: cursorYSpring,
                    x: -16, // Center offset
                    y: -16
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                }}
            />
        </>
    );
};

export default CustomCursor;
