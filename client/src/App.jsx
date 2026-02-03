import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import MagneticCursor from './components/MagneticCursor';
import ParticleField from './components/ParticleField';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import ScrollProgress from './components/ScrollProgress';

function App() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    return (
        <div
            ref={containerRef}
            className="min-h-screen font-sans relative transition-colors duration-300"
            style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)'
            }}
        >
            <ParticleField />
            <MagneticCursor />
            <ScrollProgress progress={scrollYProgress} />
            <Navbar />

            <main>
                <Hero />
                <About />
                <Experience />
                <Services />
                <Projects />
                <Contact />
            </main>

            <footer
                className="py-12 text-center transition-colors duration-300"
                style={{ borderTop: '1px solid var(--border-color)' }}
            >
                <div className="flex justify-center gap-6 mb-6">
                    <a
                        href="https://github.com/sabhi128"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-all duration-300 hover:scale-110"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                        <FaGithub size={22} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/ahmad-sabhi-835304374"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-all duration-300 hover:scale-110"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#0077b5'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                        <FaLinkedin size={22} />
                    </a>
                    <a
                        href="https://www.instagram.com/sabhi__ahmad"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-all duration-300 hover:scale-110"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#e4405f'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                        <FaInstagram size={22} />
                    </a>
                </div>
                <p
                    className="text-sm font-mono"
                    style={{ color: 'var(--text-muted)' }}
                >
                    © {new Date().getFullYear()} Ahmad Sabhi
                </p>
            </footer>
        </div>
    );
}

export default App;
