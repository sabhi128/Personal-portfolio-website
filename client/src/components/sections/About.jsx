import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';
import ProfileImage from '../../assets/6k6sxfwrb5rmy0cw3thsgk0z60 (1).png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const skillsRef = useRef(null);
    const statsRef = useRef(null);
    const { isDark } = useTheme();

    const skills = [
        // Frontend
        { name: 'React', color: '#61dafb' },
        { name: 'Next.js', color: '#ffffff' },
        { name: 'Tailwind CSS', color: '#38bdf8' },
        { name: 'JavaScript', color: '#f7df1e' },
        { name: 'HTML/CSS', color: '#e34f26' },
        // Backend
        { name: 'Node.js', color: '#68a063' },
        { name: 'Express', color: '#ffffff' },
        { name: 'REST APIs', color: '#60a5fa' },
        { name: 'Authentication', color: '#a78bfa' },
        // Databases
        { name: 'MongoDB', color: '#4db33d' },
        { name: 'Supabase', color: '#3ecf8e' },
        { name: 'SQL', color: '#336791' },
        // Tools & Automation
        { name: 'Git & GitHub', color: '#f05032' },
        { name: 'Vercel', color: '#ffffff' },
        { name: 'Postman', color: '#ff6c37' },
        { name: 'n8n', color: '#ea4b71' },
        // AI
        { name: 'AI Agents', color: '#10b981' },
        { name: 'Chatbots', color: '#8b5cf6' },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Heading reveal - scrub tied to scroll
            gsap.fromTo(headingRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: 1 // Smooth 1-second catch-up
                    }
                }
            );

            // Text paragraphs stagger
            const paragraphs = textRef.current.querySelectorAll('p');
            paragraphs.forEach((p, i) => {
                gsap.fromTo(p,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: p,
                            start: "top 90%",
                            end: "top 70%",
                            scrub: 1
                        }
                    }
                );
            });

            // Skills animation - scrub
            const skillButtons = skillsRef.current.querySelectorAll('.skill-btn');
            skillButtons.forEach((btn, i) => {
                gsap.fromTo(btn,
                    { scale: 0.8, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: skillsRef.current,
                            start: `top ${90 - i * 2}%`,
                            end: `top ${75 - i * 2}%`,
                            scrub: 0.5
                        }
                    }
                );
            });

            // Stats counter animation - scrub
            const statNumbers = statsRef.current.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const endValue = parseInt(stat.dataset.value);
                gsap.fromTo(stat,
                    { textContent: 0 },
                    {
                        textContent: endValue,
                        ease: "none",
                        snap: { textContent: 1 },
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: "top 85%",
                            end: "top 50%",
                            scrub: 1
                        },
                        onUpdate: function () {
                            stat.textContent = Math.floor(gsap.getProperty(stat, "textContent"));
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="min-h-screen py-32 px-6 relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
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
                {/* Floating orbs */}
                <motion.div
                    animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 left-1/4 w-[250px] h-[250px] bg-purple-500/8 rounded-full blur-[80px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[120px]"
                />

                {/* Dot pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section Header */}
                <div ref={headingRef} className="mb-20 text-center">
                    <p className="text-accent font-mono text-sm mb-4 tracking-wider uppercase">About Me</p>
                    <h2 className="text-4xl md:text-6xl font-display font-bold">
                        Crafting Digital
                        <span className="accent-gradient"> Experiences</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div ref={textRef} className="space-y-6">
                        <p className="text-xl leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                            Hi, I'm <span className="text-accent">Ahmad Sabhi</span>, a Full Stack Developer who builds web applications.
                        </p>
                        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            With expertise in the MERN stack, Next.js, and Supabase, I create solutions that not only look great but also perform exceptionally. My approach combines clean code practices with modern design thinking.
                        </p>
                        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            I'm constantly learning and pushing myself to create work that is unique, innovative, and solves real-world problems.
                        </p>

                        {/* Stats */}
                        <div ref={statsRef} className="grid grid-cols-3 gap-8 pt-8" style={{ borderTop: '1px solid var(--border-color)' }}>
                            {[
                                { value: 3, label: 'Years Experience', suffix: '+' },
                                { value: 10, label: 'Projects Completed', suffix: '+' },
                                { value: 100, label: 'Happy Clients', suffix: '+' },
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <span className="text-4xl font-display font-bold accent-gradient">
                                        <span className="stat-number" data-value={stat.value}>{stat.value}</span>{stat.suffix}
                                    </span>
                                    <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div>
                        <h3 className="text-xl font-display font-bold mb-8">Technologies I Work With</h3>
                        <div ref={skillsRef} className="flex flex-wrap gap-3">
                            {skills.map((skill) => (
                                <button
                                    key={skill.name}
                                    className="skill-btn px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110"
                                    style={{
                                        '--skill-color': skill.color,
                                        background: 'var(--bg-tertiary)',
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-primary)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.borderColor = skill.color;
                                        e.target.style.color = skill.color;
                                        e.target.style.backgroundColor = skill.color + '15';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.borderColor = 'var(--border-color)';
                                        e.target.style.color = 'var(--text-primary)';
                                        e.target.style.backgroundColor = 'var(--bg-tertiary)';
                                    }}
                                    data-magnetic
                                >
                                    {skill.name}
                                </button>
                            ))}
                        </div>

                        {/* Download Resume */}
                        <motion.a
                            href="/resume.pdf"
                            download="Ahmad_Sabhi_CV.pdf"
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-10 inline-flex items-center gap-3 px-6 py-3 rounded-full transition-all group"
                            style={{
                                background: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)'
                            }}
                            data-magnetic
                        >
                            <span>Download Resume</span>
                            <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </motion.a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
