import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const Contact = () => {
    const socials = [
        { icon: FaGithub, label: 'GitHub', href: 'https://github.com', color: '#ffffff' },
        { icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: '#0077b5' },
        { icon: FaTwitter, label: 'Twitter', href: 'https://twitter.com', color: '#1da1f2' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        },
        exit: { opacity: 0 }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen pt-32 pb-20 px-6 flex items-center"
        >
            <div className="max-w-4xl mx-auto text-center">
                {/* Section Header */}
                <motion.div variants={itemVariants} className="mb-8">
                    <p className="text-accent font-mono text-sm mb-4 tracking-wider uppercase">Contact</p>
                </motion.div>

                {/* Main Heading */}
                <motion.h2
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight"
                >
                    Let's Work
                    <br />
                    <span className="accent-gradient">Together</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Have a project in mind or just want to chat? I'm always open to discussing new opportunities and creative ideas.
                </motion.p>

                {/* Email CTA */}
                <motion.div variants={itemVariants} className="mb-16">
                    <motion.a
                        href="mailto:your.email@example.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="magnetic-btn inline-flex items-center gap-3 text-lg"
                        data-magnetic
                    >
                        <FaEnvelope />
                        <span>Say Hello</span>
                        <FaArrowRight />
                    </motion.a>
                </motion.div>

                {/* Divider */}
                <motion.div variants={itemVariants} className="mb-12">
                    <div className="glow-line max-w-xs mx-auto" />
                </motion.div>

                {/* Social Links */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center gap-8"
                >
                    {socials.map((social, index) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="group flex flex-col items-center gap-2"
                            data-magnetic
                        >
                            <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-300">
                                <social.icon size={24} className="text-muted group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-xs text-muted group-hover:text-white transition-colors">
                                {social.label}
                            </span>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Footer Text */}
                <motion.p
                    variants={itemVariants}
                    className="mt-20 text-sm text-muted/50"
                >
                    Designed & Built with 💜
                </motion.p>
            </div>
        </motion.section>
    );
};

export default Contact;
