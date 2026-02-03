import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowDown, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import ProfileImage from '../../assets/6k6sxfwrb5rmy0cw3thsgk0z60 (1).png';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const headingRef = useRef(null);
    const imageRef = useRef(null);
    const decorRef = useRef(null);
    const { isDark } = useTheme();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Split text animation for heading
            const chars = headingRef.current.querySelectorAll('.char');
            gsap.fromTo(chars,
                {
                    y: 100,
                    opacity: 0,
                    rotateX: -90
                },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    stagger: 0.03,
                    duration: 1,
                    ease: "power4.out",
                    delay: 0.5
                }
            );

            // Image parallax on scroll
            gsap.to(imageRef.current, {
                y: 150,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // Decorative elements parallax
            gsap.to(decorRef.current.querySelectorAll('.decor-orb'), {
                y: (i) => 100 + i * 50,
                rotation: (i) => i * 180,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5
                }
            });

            // Fade out hero on scroll
            gsap.to(containerRef.current, {
                opacity: 0,
                scale: 0.95,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "center top",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Split text into characters
    const splitText = (text) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block" style={{ perspective: '1000px' }}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated gradient background */}
            <div ref={decorRef} className="absolute inset-0 pointer-events-none">
                <div className="decor-orb absolute top-1/4 -left-32 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />
                <div className="decor-orb absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[150px]" />
                <div className="decor-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-green/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="order-2 lg:order-1">
                    <h1
                        ref={headingRef}
                        className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-6"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="block"
                        >
                            Hi, I'm
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="block accent-gradient"
                        >
                            Ahmad
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="block accent-gradient"
                        >
                            Sabhi
                        </motion.span>
                    </h1>

                    {/* Role subtitle - moved here */}
                    <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="text-accent font-mono text-sm md:text-base mb-8 tracking-wider"
                    >
                        ✦ Full Stack MERN Developer
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="text-muted text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
                    >
                        Building web applications with Next.js, Supabase, and the MERN stack.
                        Turning ideas into powerful digital solutions.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.7, duration: 0.8 }}
                        className="flex flex-wrap gap-4 mb-10"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="magnetic-btn"
                            data-magnetic
                        >
                            View Projects
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full font-medium transition-all"
                            style={{
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)',
                                backgroundColor: isDark ? 'transparent' : 'var(--bg-secondary)'
                            }}
                            data-magnetic
                        >
                            Contact Me
                        </motion.a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.9, duration: 0.8 }}
                        className="flex gap-5"
                    >
                        {[
                            { icon: FaGithub, href: 'https://github.com/sabhi128', color: '#ffffff' },
                            { icon: FaLinkedin, href: 'https://www.linkedin.com/in/ahmad-sabhi-835304374', color: '#0077b5' },
                            { icon: FaInstagram, href: 'https://www.instagram.com/sabhi__ahmad', color: '#e4405f' },
                        ].map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ scale: 1.2, y: -3 }}
                                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                                style={{
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-muted)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = social.color;
                                    e.currentTarget.style.color = social.color;
                                    e.currentTarget.style.backgroundColor = `${social.color}15`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                    e.currentTarget.style.color = 'var(--text-muted)';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                                data-magnetic
                            >
                                <social.icon size={20} />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* Profile Image with GSAP Parallax */}
                <div ref={imageRef} className="order-1 lg:order-2 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Decorative rings */}
                        <div className="absolute -inset-8 rounded-full border border-dashed border-accent/20 animate-[spin_60s_linear_infinite]" />
                        <div className="absolute -inset-16 rounded-full border border-dashed border-accent-purple/10 animate-[spin_45s_linear_infinite_reverse]" />

                        {/* Image container */}
                        <div
                            className="relative w-80 h-80 md:w-96 md:h-96 mx-auto rounded-full overflow-hidden"
                            style={{ border: '2px solid var(--border-color)' }}
                        >
                            <img
                                src={ProfileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            <div
                                className="absolute inset-0 opacity-40"
                                style={{
                                    background: isDark
                                        ? 'linear-gradient(to top, var(--bg-primary), transparent, transparent)'
                                        : 'linear-gradient(to top, var(--bg-secondary), transparent, transparent)'
                                }}
                            />
                        </div>

                        {/* Floating badges */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-4 -right-4 px-4 py-2 rounded-full text-sm font-mono backdrop-blur-sm"
                            style={{
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)'
                            }}
                        >
                            <span className="text-accent">3+</span> Years Exp
                        </motion.div>
                        <motion.div
                            animate={{ y: [10, -10, 10] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full text-sm font-mono backdrop-blur-sm"
                            style={{
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)'
                            }}
                        >
                            <span className="accent-gradient">10+</span> Projects
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.a
                    href="#about"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-muted text-sm"
                >
                    <span className="font-mono text-xs tracking-widest">SCROLL DOWN</span>
                    <FaArrowDown />
                </motion.a>
            </motion.div>
        </section>
    );
};

export default Hero;
