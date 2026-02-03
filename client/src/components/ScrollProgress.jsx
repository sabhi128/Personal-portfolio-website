import React from 'react';
import { motion, useSpring } from 'framer-motion';

const ScrollProgress = ({ progress }) => {
    const scaleX = useSpring(progress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-purple origin-left z-[100]"
            style={{ scaleX }}
        />
    );
};

export default ScrollProgress;
