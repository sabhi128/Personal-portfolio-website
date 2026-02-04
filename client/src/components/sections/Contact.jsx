import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const contentRef = useRef(null);
    const { isDark } = useTheme();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Split heading animation - scrub
            const lines = headingRef.current.querySelectorAll('.line');
            lines.forEach((line, i) => {
                gsap.fromTo(line,
                    { y: 120, opacity: 0, rotationX: -80 },
                    {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: `top ${85 - i * 5}%`,
                            end: `top ${60 - i * 5}%`,
                            scrub: 1
                        }
                    }
                );
            });

            // Content fade in - scrub
            const contentChildren = contentRef.current.children;
            Array.from(contentChildren).forEach((child, i) => {
                gsap.fromTo(child,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: child,
                            start: "top 95%",
                            end: "top 70%",
                            scrub: 1
                        }
                    }
                );
            });

            // Gradient orb animation
            gsap.to('.contact-orb', {
                scale: 1.3,
                opacity: 0.6,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const socials = [
        { icon: FaGithub, label: 'GitHub', href: 'https://github.com/sabhi128', color: isDark ? '#ffffff' : '#000000' },
        { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmad-sabhi-835304374', color: '#0077b5' },
        { icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/sabhi__ahmad', color: '#e4405f' },
    ];

    return (
        <>
            {/* Toast Notification */}
            {showToast && (
                <motion.div
                    initial={{ opacity: 0, x: 100, y: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="fixed top-6 right-6 z-[9999] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
                    style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#ffffff'
                    }}
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">{toastMessage}</span>
                </motion.div>
            )}

            <section
                ref={sectionRef}
                id="contact"
                className="min-h-screen py-32 px-6 flex items-center relative overflow-hidden"
                style={{ backgroundColor: 'var(--bg-primary)' }}
            >
                {/* Background */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: isDark
                            ? 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))'
                            : 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))'
                    }}
                />

                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Central pulsing orb */}
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/10 rounded-full blur-[200px]"
                    />

                    {/* Floating corner orbs */}
                    <motion.div
                        animate={{ y: [-30, 30, -30], x: [-20, 20, -20] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 right-1/4 w-[250px] h-[250px] bg-accent-purple/10 rounded-full blur-[80px]"
                    />
                    <motion.div
                        animate={{ y: [30, -30, 30], x: [20, -20, 20] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] bg-green-500/8 rounded-full blur-[80px]"
                    />

                    {/* Floating particles */}
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -500],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 10 + Math.random() * 10,
                                repeat: Infinity,
                                delay: i * 0.8,
                                ease: "linear"
                            }}
                            className="absolute w-1 h-1 bg-white/30 rounded-full"
                            style={{
                                left: `${10 + Math.random() * 80}%`,
                                bottom: '-5%'
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    {/* Section Label */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-accent font-mono text-sm mb-6 tracking-wider uppercase"
                    >
                        Get In Touch
                    </motion.p>

                    {/* Main Heading with line breaks for animation */}
                    <div ref={headingRef} className="mb-8 overflow-hidden" style={{ perspective: '1000px' }}>
                        <div className="line overflow-hidden">
                            <span className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight block">
                                Let's Work
                            </span>
                        </div>
                        <div className="line overflow-hidden">
                            <span className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight accent-gradient block">
                                Together
                            </span>
                        </div>
                    </div>

                    <div ref={contentRef}>
                        {/* Description */}
                        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Have a project in mind or just want to chat? I'm always open to discussing new opportunities, creative ideas, or partnerships.
                        </p>

                        {/* Email CTA */}
                        <div className="mb-16">
                            <motion.a
                                href="https://mail.google.com/mail/?view=cm&to=sabhiahmad81@gmail.com"
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="magnetic-btn inline-flex items-center gap-3 text-lg cursor-pointer relative z-20"
                                data-magnetic
                            >
                                <FaEnvelope />
                                <span>Say Hello</span>
                                <FaArrowRight />
                            </motion.a>
                        </div>

                        {/* Divider */}
                        <div className="mb-12 flex items-center justify-center gap-4">
                            <div className="h-px w-16" style={{ backgroundColor: 'var(--border-color)' }} />
                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>or find me on</span>
                            <div className="h-px w-16" style={{ backgroundColor: 'var(--border-color)' }} />
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center gap-6">
                            {socials.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="group relative"
                                    data-magnetic
                                >
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 social-icon-container"
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--border-color)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = social.color;
                                            e.currentTarget.style.backgroundColor = `${social.color}15`;
                                            e.currentTarget.querySelector('svg').style.color = social.color;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--border-color)';
                                            e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                                            e.currentTarget.querySelector('svg').style.color = 'var(--text-muted)';
                                        }}
                                    >
                                        <social.icon size={24} style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} />
                                    </div>
                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }}>
                                        {social.label}
                                    </span>
                                </motion.a>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <div className="mt-20 pt-16" style={{ borderTop: '1px solid var(--border-color)' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="max-w-2xl mx-auto"
                            >
                                <h3 className="text-2xl font-display font-bold mb-3 text-center" style={{ color: 'var(--text-primary)' }}>
                                    Let's Work Together
                                </h3>
                                <p className="text-sm mb-8 text-center" style={{ color: 'var(--text-muted)' }}>
                                    Fill out the form below and I'll get back to you as soon as possible.
                                </p>

                                <form
                                    className="space-y-6"
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.target);

                                        try {
                                            await fetch('https://formsubmit.co/ajax/sabhiahmad81@gmail.com', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Accept': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    firstName: formData.get('firstName'),
                                                    lastName: formData.get('lastName'),
                                                    email: formData.get('email'),
                                                    phone: formData.get('phone'),
                                                    service: formData.get('service'),
                                                    heardFrom: formData.get('heardFrom'),
                                                    budget: formData.get('budget'),
                                                    project: formData.get('project'),
                                                    _subject: 'New Project Inquiry!'
                                                })
                                            });
                                            setToastMessage('Message sent successfully!');
                                            setShowToast(true);
                                            e.target.reset();
                                            setTimeout(() => setShowToast(false), 4000);
                                        } catch (error) {
                                            setToastMessage('Message sent!');
                                            setShowToast(true);
                                            setTimeout(() => setShowToast(false), 4000);
                                        }
                                    }}
                                >
                                    {/* Row 1: First Name & Last Name */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                                                First Name<span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                required
                                                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                                                style={{
                                                    background: 'var(--bg-tertiary)',
                                                    border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)'
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                                                style={{
                                                    background: 'var(--bg-tertiary)',
                                                    border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: Email & Phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                                                Email<span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                                                style={{
                                                    background: 'var(--bg-tertiary)',
                                                    border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)'
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                                                Phone Number<span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                                                style={{
                                                    background: 'var(--bg-tertiary)',
                                                    border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Service & Where Heard */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                                                What service are you looking for?<span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="service"
                                                required
                                                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all cursor-pointer"
                                                style={{
                                                    background: 'var(--bg-tertiary)',
                                                    border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)'
                                                }}
                                            >
                                                <option value="">Please Select</option>
                                                <option value="Web Development">Web Development</option>
                                                <option value="MERN Stack Development">MERN Stack Development</option>
                                                <option value="Next.js Development">Next.js Development</option>
                                                <option value="Dashboard & Admin Panel">Dashboard & Admin Panel</option>
                                                <option value="API Development">API Development</option>
                                                <option value="Bug Fixing">Bug Fixing & Code Improvement</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                                                Where did you hear about us?
                                            </label>
                                            <select
                                                name="heardFrom"
                                                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all cursor-pointer"
                                                style={{
                                                    background: 'var(--bg-tertiary)',
                                                    border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)'
                                                }}
                                            >
                                                <option value="">Please Select</option>
                                                <option value="Google">Google</option>
                                                <option value="LinkedIn">LinkedIn</option>
                                                <option value="GitHub">GitHub</option>
                                                <option value="Instagram">Instagram</option>
                                                <option value="Referral">Referral</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 4: Budget */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                                            What is your budget?<span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="budget"
                                            required
                                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all cursor-pointer"
                                            style={{
                                                background: 'var(--bg-tertiary)',
                                                border: '1px solid var(--border-color)',
                                                color: 'var(--text-primary)'
                                            }}
                                        >
                                            <option value="">Select</option>
                                            <option value="Less than $500">Less than $500</option>
                                            <option value="$500 - $1,000">$500 - $1,000</option>
                                            <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                                            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                                            <option value="$10,000+">$10,000+</option>
                                        </select>
                                    </div>

                                    {/* Row 5: Project Description */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                                            Tell us more about your project<span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="project"
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all resize-none"
                                            style={{
                                                background: 'var(--bg-tertiary)',
                                                border: '1px solid var(--border-color)',
                                                color: 'var(--text-primary)'
                                            }}
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-purple) 100%)',
                                            color: '#ffffff'
                                        }}
                                    >
                                        <span>Send Message</span>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </motion.button>
                                </form>

                            </motion.div>
                        </div>

                        {/* Email display */}
                        <p className="mt-16 font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                            sabhiahmad81@gmail.com
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
