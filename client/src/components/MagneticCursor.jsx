import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MagneticCursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseEnter = (e) => {
            if (e.target.closest('a, button, [data-magnetic]')) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = (e) => {
            if (e.target.closest('a, button, [data-magnetic]')) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Outer ring */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="rounded-full border border-white"
                    animate={{
                        width: isHovering ? 60 : 40,
                        height: isHovering ? 60 : 40,
                        opacity: isClicking ? 0.5 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>

            {/* Inner dot */}
            <motion.div
                ref={cursorDotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="rounded-full bg-accent"
                    animate={{
                        width: isHovering ? 8 : 6,
                        height: isHovering ? 8 : 6,
                        scale: isClicking ? 0.8 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                />
            </motion.div>
        </>
    );
};

export default MagneticCursor;
