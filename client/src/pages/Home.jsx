import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowDown, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Home = () => {
    // Animation variants for staggered text
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            }
        },
        exit: { opacity: 0, y: -20 }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    };

    const floatVariants = {
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-hero-gradient" />

            {/* Animated gradient orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-purple/20 rounded-full blur-[100px]"
            />

            <motion.div
                variants={containerVariants}
                className="relative z-10 max-w-5xl mx-auto px-6 text-center"
            >
                {/* Greeting */}
                <motion.p
                    variants={itemVariants}
                    className="text-accent font-mono text-sm md:text-base mb-6 tracking-wider uppercase"
                >
                    Hello, I'm
                </motion.p>

                {/* Main Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
                >
                    <span className="text-white">Creative</span>
                    <br />
                    <span className="accent-gradient">Developer</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    I craft immersive digital experiences with clean code and creative design.
                    Specializing in full-stack development with the MERN stack.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                >
                    <Link to="/projects" data-magnetic>
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="magnetic-btn"
                        >
                            View My Work
                        </motion.span>
                    </Link>
                    <Link to="/contact" data-magnetic>
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
                        >
                            Get In Touch
                        </motion.span>
                    </Link>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    variants={itemVariants}
                    className="flex gap-6 justify-center"
                >
                    {[
                        { icon: FaGithub, href: 'https://github.com' },
                        { icon: FaLinkedin, href: 'https://linkedin.com' },
                        { icon: FaTwitter, href: 'https://twitter.com' },
                    ].map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.2, y: -3 }}
                            className="text-muted hover:text-white transition-colors"
                            data-magnetic
                        >
                            <social.icon size={22} />
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                variants={floatVariants}
                animate="animate"
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-muted text-sm"
                >
                    <span className="font-mono text-xs tracking-widest">SCROLL</span>
                    <FaArrowDown className="animate-bounce" />
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default Home;
