import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const timelineRef = useRef(null);
    const { isDark } = useTheme();

    const experiences = [
        {
            id: 1,
            title: 'Full Stack MERN Developer',
            company: 'NextStac',
            period: 'Nov 2023 - Dec 2025',
            duration: '2 yrs 3 mos',
            description: 'I worked as a Full Stack MERN Developer at NextStac from November 2023 to December 2025, where I was responsible for building modern, scalable, and high-performance web applications. I developed responsive and user-friendly front-end interfaces using React.js and Next.js, and built secure, efficient back-end systems using Node.js and Express.js.',
            details: 'My role involved working with databases such as MongoDB and Supabase, designing and consuming RESTful APIs, implementing authentication and authorization, and developing dashboards, admin panels, and business-driven features. I collaborated closely with cross-functional teams to transform requirements into reliable solutions and handled deployment on platforms like Vercel. I focused on clean code, performance optimization, and delivering high-quality results aligned with client goals.',
            color: '#60a5fa',
        },
        {
            id: 2,
            title: 'MERN Stack Developer Intern',
            company: 'NextStac',
            period: 'Jan 2023 - Mar 2023',
            duration: '3 mos',
            description: 'I worked as a MERN Stack Developer Intern at NextStac, where I gained hands-on experience in building real-world web applications using the MERN stack. During my internship, I assisted in developing responsive front-end interfaces using React.js and Next.js, and supported back-end development with Node.js and Express.js.',
            details: 'I worked with MongoDB for database management, helped integrate RESTful APIs, and learned best practices for authentication, data handling, and application performance. I collaborated with senior developers, participated in code reviews, and contributed to feature development, bug fixing, and deployment processes using platforms like Vercel. This internship strengthened my understanding of full stack development, clean coding practices, and team-based software development.',
            color: '#a78bfa',
        },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
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

            // Timeline items animation
            const items = timelineRef.current.children;
            gsap.fromTo(items,
                { x: -80, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 80%",
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
            id="experience"
            className="min-h-screen py-32 px-6 relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            {/* Background gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: isDark
                        ? 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary), var(--bg-primary))'
                        : 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary), var(--bg-secondary))'
                }}
            />

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-[120px]"
                    style={{ backgroundColor: isDark ? 'rgba(96, 165, 250, 0.08)' : 'rgba(59, 130, 246, 0.08)' }}
                />
                <motion.div
                    animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 left-1/3 w-[250px] h-[250px] rounded-full blur-[100px]"
                    style={{ backgroundColor: isDark ? 'rgba(167, 139, 250, 0.08)' : 'rgba(139, 92, 246, 0.08)' }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Section Header */}
                <div ref={headingRef} className="mb-16 text-center">
                    <p className="text-accent font-mono text-sm mb-4 tracking-wider uppercase">My Journey</p>
                    <h2 className="text-4xl md:text-6xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                        Work
                        <span className="accent-gradient"> Experience</span>
                    </h2>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative">
                    {/* Vertical line */}
                    <div
                        className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
                        style={{ backgroundColor: 'var(--border-color)' }}
                    />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            whileHover={{ x: 10 }}
                            transition={{ duration: 0.3 }}
                            className="relative mb-12 md:pl-20"
                        >
                            {/* Timeline dot */}
                            <div
                                className="absolute left-6 top-2 w-5 h-5 rounded-full border-4 hidden md:block"
                                style={{
                                    borderColor: exp.color,
                                    backgroundColor: 'var(--bg-primary)'
                                }}
                            />

                            {/* Experience Card */}
                            <div
                                className="p-6 md:p-8 rounded-2xl transition-all duration-300"
                                style={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid var(--border-color)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = exp.color;
                                    e.currentTarget.style.boxShadow = `0 20px 40px -15px ${exp.color}20`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {/* Header */}
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h3
                                            className="text-xl md:text-2xl font-display font-bold mb-1"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            {exp.title}
                                        </h3>
                                        <p className="text-accent font-medium">{exp.company}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                                        <FaCalendarAlt size={14} />
                                        <span>{exp.period}</span>
                                        <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: `${exp.color}20`, color: exp.color }}>
                                            {exp.duration}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p
                                    className="text-sm md:text-base leading-relaxed mb-4"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {exp.description}
                                </p>

                                {/* Details */}
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    {exp.details}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
