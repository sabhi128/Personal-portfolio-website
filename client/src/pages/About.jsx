import React from 'react';
import { motion } from 'framer-motion';
import ProfileImage from '../assets/6k6sxfwrb5rmy0cw3thsgk0z60 (1).png';

const About = () => {
    const skills = [
        { name: 'React', category: 'Frontend' },
        { name: 'Node.js', category: 'Backend' },
        { name: 'MongoDB', category: 'Database' },
        { name: 'Express', category: 'Backend' },
        { name: 'TypeScript', category: 'Language' },
        { name: 'Tailwind', category: 'Styling' },
        { name: 'Framer Motion', category: 'Animation' },
        { name: 'Git', category: 'Tools' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: { opacity: 0, y: -20 }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
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
                <motion.div variants={itemVariants} className="mb-16">
                    <p className="text-accent font-mono text-sm mb-4 tracking-wider uppercase">About Me</p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Crafting Digital
                        <span className="accent-gradient"> Experiences</span>
                    </h2>
                    <div className="glow-line max-w-xs" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Text Content */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <p className="text-lg text-muted leading-relaxed">
                            Hello! I'm a <span className="text-white font-medium">full-stack developer</span> with a passion for creating beautiful, functional, and user-centered digital experiences.
                        </p>
                        <p className="text-lg text-muted leading-relaxed">
                            I specialize in building modern web applications using the <span className="text-accent">MERN stack</span>. My approach combines clean code practices with creative design thinking to deliver solutions that not only work great but look amazing.
                        </p>
                        <p className="text-lg text-muted leading-relaxed">
                            When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or designing UI concepts.
                        </p>

                        {/* Skills */}
                        <motion.div variants={itemVariants} className="pt-8">
                            <h3 className="text-xl font-display font-bold mb-6 text-white">Technologies I Work With</h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, index) => (
                                    <motion.span
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 + index * 0.05 }}
                                        className="skill-badge"
                                        data-magnetic
                                    >
                                        {skill.name}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        variants={itemVariants}
                        className="relative"
                    >
                        <div className="relative group">
                            {/* Decorative border */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="absolute -inset-4 rounded-2xl border border-accent/20 group-hover:border-accent/40 transition-colors duration-500"
                            />

                            {/* Image container */}
                            <div className="relative overflow-hidden rounded-2xl aspect-square bg-dark-200">
                                <motion.img
                                    src={ProfileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                />

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating accent */}
                            <motion.div
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default About;
