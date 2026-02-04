import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const projectsRef = useRef(null);
    const [activeProject, setActiveProject] = useState(null);
    const { isDark } = useTheme();

    const projects = [
        {
            id: 1,
            title: 'AI Powered Resume and Portfolio Builder',
            category: 'Full Stack Application',
            description: 'A resume and portfolio builder powered by AI. Create professional resumes and portfolios with suggestions and modern templates.',
            image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80',
            techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'AI/ML'],
            github: 'https://github.com/sabhi128/Resume-Portfolio-Builder',
            live: 'https://resume-portfolio-builder-nine.vercel.app',
            color: '#60a5fa',
        },
        {
            id: 2,
            title: 'Modern Digital Agency Website',
            category: 'Web Application',
            description: 'A modern digital agency website built with React JS, Tailwind CSS, and Vite. Features animations and responsive design.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
            techStack: ['React', 'Tailwind CSS', 'Vite', 'JavaScript'],
            github: 'https://github.com/sabhi128/agency-ai-webify',
            live: 'https://agency-ai-webify.vercel.app',
            color: '#a78bfa',
        },
        {
            id: 3,
            title: 'NextStac ERP',
            category: 'Enterprise Application',
            description: 'An Enterprise Resource Planning system with HR, Inventory, Sales, and Finance modules. Built for real-world business use.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
            techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
            github: 'https://github.com/sabhi128/NEXTSTAC-ERP',
            live: 'https://nextstac-erp-9ck1.vercel.app',
            color: '#4ade80',
        },
        {
            id: 4,
            title: 'Spotify Clone',
            category: 'Web Application',
            description: 'A Spotify clone with music playback, playlists, and a UI inspired by the original Spotify design.',
            image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1200&q=80',
            techStack: ['React', 'JavaScript', 'CSS', 'Spotify API'],
            github: 'https://github.com/sabhi128/Spotify-Clone-proj',
            live: 'https://spotify-clone-proj-omega.vercel.app',
            color: '#1db954',
        },
        {
            id: 5,
            title: 'Forever E-Commerce',
            category: 'Full Stack Application',
            description: 'A full-stack MERN e-commerce platform with a complete admin dashboard for product management, orders, and user analytics.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
            techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Admin Dashboard'],
            github: 'https://github.com/sabhi128/forever-Full-stack-website',
            live: 'https://forever-full-stack-website.vercel.app',
            color: '#f472b6',
        },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation - scrub
            gsap.fromTo(headingRef.current,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: 1
                    }
                }
            );

            // Project cards animation - scrub for bidirectional
            const projectCards = projectsRef.current.querySelectorAll('.project-item');
            projectCards.forEach((card, index) => {
                const direction = index % 2 === 0 ? -100 : 100;

                gsap.fromTo(card,
                    { x: direction, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 95%",
                            end: "top 60%",
                            scrub: 1
                        }
                    }
                );

                // Image reveal effect
                const image = card.querySelector('.project-image');
                gsap.from(image, {
                    scale: 1.3,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 75%",
                        end: "bottom 25%",
                        scrub: 1
                    }
                });
            });

            // Parallax effect on images during scroll
            projectCards.forEach((card) => {
                const image = card.querySelector('.project-image');
                gsap.to(image, {
                    y: -50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="min-h-screen py-32 px-6 relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <div
                className="absolute inset-0"
                style={{
                    background: isDark
                        ? 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary), var(--bg-secondary))'
                        : 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary), var(--bg-primary))'
                }}
            />

            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating orbs */}
                <motion.div
                    animate={{ y: [-30, 30, -30], rotate: [0, 180, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ y: [30, -30, 30], x: [-20, 20, -20] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/3 right-0 w-[350px] h-[350px] bg-accent-purple/8 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-2/3 left-0 w-[300px] h-[300px] bg-green-500/5 rounded-full blur-[90px]"
                />

                {/* Vertical grid lines */}
                {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.02, 0.05, 0.02] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                        className="absolute top-0 bottom-0 w-px"
                        style={{
                            left: `${i * 20}%`,
                            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div ref={headingRef} className="mb-20 text-center">
                    <p className="text-accent font-mono text-sm mb-4 tracking-wider uppercase">My Work</p>
                    <h2 className="text-4xl md:text-6xl font-display font-bold">
                        Featured
                        <span className="accent-gradient"> Projects</span>
                    </h2>
                </div>

                {/* Projects List */}
                <div ref={projectsRef} className="space-y-32">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`project-item grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
                            onMouseEnter={() => setActiveProject(project.id)}
                            onMouseLeave={() => setActiveProject(null)}
                        >
                            {/* Image */}
                            <div className={`relative overflow-hidden rounded-2xl ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                <div className="aspect-video overflow-hidden rounded-2xl relative group">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="project-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                    {/* Project number */}
                                    <span
                                        className="absolute top-6 left-6 text-8xl font-display font-bold opacity-20"
                                        style={{ color: project.color }}
                                    >
                                        0{index + 1}
                                    </span>

                                    {/* Hover buttons */}
                                    <div className={`absolute bottom-6 left-6 right-6 flex gap-4 transform transition-all duration-500 ${activeProject === project.id ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex-1 py-3 rounded-full bg-white text-dark font-medium text-center hover:bg-accent transition-colors"
                                        >
                                            View Live
                                        </a>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors"
                                        >
                                            <FaGithub size={20} />
                                        </a>
                                    </div>
                                </div>

                                {/* Decorative border */}
                                <div
                                    className="absolute -inset-4 rounded-3xl border -z-10 transition-all duration-500"
                                    style={{
                                        borderColor: activeProject === project.id ? project.color + '40' : 'rgba(255,255,255,0.05)'
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div className={index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}>
                                <motion.p
                                    className="text-accent font-mono text-sm mb-2"
                                    animate={{ x: activeProject === project.id ? (index % 2 === 1 ? -5 : 5) : 0 }}
                                >
                                    {project.category}
                                </motion.p>
                                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
                                    {project.title}
                                </h3>
                                <p className="text-muted text-lg mb-6 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className={`flex flex-wrap gap-2 mb-8 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className={`flex gap-6 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                                    <motion.a
                                        href={project.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        whileHover={{ x: 5 }}
                                        className="flex items-center gap-2 text-accent hover:text-white transition-colors font-medium group"
                                        data-magnetic
                                    >
                                        <span>View Project</span>
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </motion.a>
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        className="text-muted hover:text-white transition-colors"
                                        data-magnetic
                                    >
                                        <FaGithub size={24} />
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
