import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { isDark, toggleTheme } = useTheme();

    const navLinks = [
        { title: 'Home', href: '#home' },
        { title: 'About', href: '#about' },
        { title: 'Experience', href: '#experience' },
        { title: 'Services', href: '#services' },
        { title: 'Projects', href: '#projects' },
        { title: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Determine active section
            const sections = ['home', 'about', 'experience', 'services', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'nav-glass py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <a
                    href="#home"
                    onClick={(e) => scrollToSection(e, '#home')}
                    className="group"
                    data-magnetic
                >
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="text-xl font-display font-bold tracking-tight"
                    >
                        <span style={{ color: 'var(--text-primary)' }}>Portfolio</span>
                        <span className="accent-gradient">.</span>
                    </motion.span>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.title}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            data-magnetic
                            className="relative group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span
                                className={`text-sm font-medium transition-colors duration-300 group-hover:text-[var(--text-primary)]`}
                                style={{
                                    color: activeSection === link.href.slice(1)
                                        ? 'var(--text-primary)'
                                        : 'var(--text-muted)'
                                }}
                            >
                                {link.title}
                            </span>
                            {/* Animated underline */}
                            <motion.span
                                className="absolute -bottom-1 left-0 h-px"
                                style={{ backgroundColor: 'var(--accent)' }}
                                initial={{ width: 0 }}
                                animate={{ width: activeSection === link.href.slice(1) ? '100%' : 0 }}
                                whileHover={{ width: '100%' }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>
                    ))}

                    {/* Theme Toggle Button */}
                    <motion.button
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            border: '1px solid var(--border-color)'
                        }}
                        data-magnetic
                    >
                        <AnimatePresence mode="wait">
                            {isDark ? (
                                <motion.div
                                    key="sun"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaSun className="text-yellow-400" size={16} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="moon"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaMoon className="text-slate-700" size={16} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    {/* CTA Button */}
                    <motion.a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, '#contact')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                        style={{
                            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)'
                        }}
                        data-magnetic
                    >
                        Let's Talk
                    </motion.a>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center rounded-full bg-white/5"
                    data-magnetic
                >
                    <motion.span
                        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -4 }}
                        className="w-5 h-0.5 bg-white absolute"
                    />
                    <motion.span
                        animate={{ opacity: isOpen ? 0 : 1 }}
                        className="w-5 h-0.5 bg-white absolute"
                    />
                    <motion.span
                        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 4 }}
                        className="w-5 h-0.5 bg-white absolute"
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-dark-100 border-t border-white/5 overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className={`text-3xl font-display font-bold transition-colors ${activeSection === link.href.slice(1) ? 'text-accent' : 'text-white'
                                            }`}
                                    >
                                        {link.title}
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
