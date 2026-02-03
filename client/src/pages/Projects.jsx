import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

const Projects = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const projects = [
        {
            id: '01',
            title: 'NextStac ERP',
            description: 'A comprehensive Enterprise Resource Planning system managing HR, Inventory, Sales, and Finance modules. Built for scalability and real-world business needs.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
            techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
            github: '#',
            live: 'https://nextstac-erp-9ck1.vercel.app',
            color: '#60a5fa',
        },
        {
            id: '02',
            title: 'E-Commerce Platform',
            description: 'Modern e-commerce solution with Stripe integration, real-time inventory, and beautiful dark mode UI.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
            techStack: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
            github: '#',
            live: '#',
            color: '#a78bfa',
        },
        {
            id: '03',
            title: 'Real-Time Dashboard',
            description: 'Analytics dashboard with live data visualization, WebSocket connections, and interactive charts.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
            techStack: ['React', 'Socket.io', 'D3.js', 'Node.js'],
            github: '#',
            live: '#',
            color: '#4ade80',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        },
        exit: { opacity: 0 }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    };

    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen pt-32 pb-20 px-6"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div variants={cardVariants} className="mb-16">
                    <p className="text-accent font-mono text-sm mb-4 tracking-wider uppercase">My Work</p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Featured
                        <span className="accent-gradient"> Projects</span>
                    </h2>
                    <div className="glow-line max-w-xs" />
                </motion.div>

                {/* Projects Grid */}
                <div className="space-y-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className="project-card group"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
                                {/* Image */}
                                <div className="relative overflow-hidden rounded-xl aspect-video lg:aspect-auto lg:h-full">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        animate={{
                                            scale: hoveredIndex === index ? 1.1 : 1
                                        }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-transparent to-transparent" />

                                    {/* Project number */}
                                    <span
                                        className="absolute top-4 left-4 text-6xl font-display font-bold opacity-20"
                                        style={{ color: project.color }}
                                    >
                                        {project.id}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-white group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted mb-6 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 text-muted"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-4">
                                        <motion.a
                                            href={project.github}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
                                            data-magnetic
                                        >
                                            <FaGithub size={18} />
                                            <span>Code</span>
                                        </motion.a>
                                        <motion.a
                                            href={project.live}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center gap-2 text-sm text-accent hover:text-white transition-colors"
                                            data-magnetic
                                        >
                                            <FaExternalLinkAlt size={16} />
                                            <span>Live Demo</span>
                                            <FaArrowRight size={12} />
                                        </motion.a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Projects;
