import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';
import {
    FaCode,
    FaServer,
    FaChartLine,
    FaDatabase,
    FaPlug,
    FaUserShield,
    FaBug
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardsRef = useRef(null);
    const { isDark } = useTheme();

    const services = [
        {
            icon: FaCode,
            title: 'Custom Web Applications',
            description: 'Tailored web solutions built from scratch to meet your unique business requirements and goals.',
            color: '#60a5fa'
        },
        {
            icon: FaServer,
            title: 'MERN Stack Development',
            description: 'Full-stack applications using MongoDB, Express, React, and Node.js.',
            color: '#a78bfa'
        },
        {
            icon: FaChartLine,
            title: 'Dashboards & Admin Panels',
            description: 'Interactive dashboards and admin panels with real-time data visualization.',
            color: '#34d399'
        },
        {
            icon: FaDatabase,
            title: 'CRM & ERP Systems',
            description: 'Custom CRM and ERP solutions to streamline your business operations and workflows.',
            color: '#f472b6'
        },
        {
            icon: FaPlug,
            title: 'Backend APIs',
            description: 'Robust RESTful APIs and backend services designed for performance and scalability.',
            color: '#fbbf24'
        },
        {
            icon: FaUserShield,
            title: 'Login & User Management',
            description: 'Secure authentication systems with role-based access control and user management.',
            color: '#22d3ee'
        },
        {
            icon: FaBug,
            title: 'Bug Fixing & Code Improvement',
            description: 'Debugging, optimization, and refactoring to improve your existing codebase quality.',
            color: '#fb7185'
        }
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation - plays on scroll down, replays on scroll up
            gsap.fromTo(headingRef.current.children,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none restart reverse"
                    }
                }
            );

            // Cards animation - plays on scroll down, replays on scroll up
            const cards = cardsRef.current.children;
            gsap.fromTo(cards,
                { y: 80, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 85%",
                        toggleActions: "play none restart reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="min-h-screen py-32 px-6 relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            {/* Background gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: isDark
                        ? 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary), var(--bg-secondary))'
                        : 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary), var(--bg-primary))'
                }}
            />

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 right-1/3 w-[350px] h-[350px] rounded-full blur-[120px]"
                    style={{ backgroundColor: isDark ? 'rgba(96, 165, 250, 0.08)' : 'rgba(59, 130, 246, 0.08)' }}
                />
                <motion.div
                    animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px]"
                    style={{ backgroundColor: isDark ? 'rgba(167, 139, 250, 0.08)' : 'rgba(139, 92, 246, 0.08)' }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section Header */}
                <div ref={headingRef} className="mb-16 text-center">
                    <p className="text-accent font-mono text-sm mb-4 tracking-wider uppercase">What I Do</p>
                    <h2 className="text-4xl md:text-6xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                        Services I
                        <span className="accent-gradient"> Offer</span>
                    </h2>
                </div>

                {/* Services Grid */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="group relative p-6 rounded-2xl transition-all duration-300"
                            style={{
                                background: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-color)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = service.color;
                                e.currentTarget.style.boxShadow = `0 20px 40px -15px ${service.color}30`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-color)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                                style={{
                                    backgroundColor: `${service.color}15`,
                                    color: service.color
                                }}
                            >
                                <service.icon size={28} />
                            </div>

                            {/* Title */}
                            <h3
                                className="text-xl font-display font-bold mb-3 transition-colors duration-300"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {service.description}
                            </p>

                            {/* Hover accent line */}
                            <div
                                className="absolute bottom-0 left-0 h-1 rounded-b-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                                style={{
                                    width: '100%',
                                    background: `linear-gradient(90deg, ${service.color}, transparent)`
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
                        Have a project in mind? Let's discuss how I can help.
                    </p>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="magnetic-btn inline-flex items-center gap-2"
                        data-magnetic
                    >
                        <span>Get In Touch</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
