import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

const AnimatedBackground = ({ variant = 'default' }) => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate floating orbs
            const orbs = containerRef.current.querySelectorAll('.bg-orb');
            orbs.forEach((orb, index) => {
                gsap.to(orb, {
                    y: `random(-50, 50)`,
                    x: `random(-30, 30)`,
                    scale: `random(0.8, 1.2)`,
                    duration: `random(4, 8)`,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: index * 0.5
                });
            });

            // Animate grid lines
            const lines = containerRef.current.querySelectorAll('.grid-line');
            lines.forEach((line, index) => {
                gsap.fromTo(line,
                    { opacity: 0 },
                    {
                        opacity: 0.03,
                        duration: 2,
                        delay: index * 0.1,
                        repeat: -1,
                        yoyo: true,
                        ease: "power2.inOut"
                    }
                );
            });

            // Animate particles
            const particles = containerRef.current.querySelectorAll('.particle');
            particles.forEach((particle) => {
                gsap.to(particle, {
                    y: -window.innerHeight,
                    duration: `random(10, 20)`,
                    repeat: -1,
                    ease: "none",
                    delay: `random(0, 10)`
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const variants = {
        default: (
            <>
                {/* Gradient Orbs */}
                <div className="bg-orb absolute top-1/4 -left-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
                <div className="bg-orb absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[100px]" />
            </>
        ),
        hero: (
            <>
                {/* Large gradient orbs */}
                <div className="bg-orb absolute top-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />
                <div className="bg-orb absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[130px]" />
                <div className="bg-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-500/5 rounded-full blur-[100px]" />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }} />
            </>
        ),
        about: (
            <>
                {/* Floating orbs */}
                <div className="bg-orb absolute top-20 right-1/4 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[100px]" />
                <div className="bg-orb absolute bottom-20 left-1/4 w-[250px] h-[250px] bg-purple-500/8 rounded-full blur-[80px]" />

                {/* Subtle dot pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />
            </>
        ),
        projects: (
            <>
                {/* Dynamic orbs */}
                <div className="bg-orb absolute top-0 left-1/3 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[120px]" />
                <div className="bg-orb absolute bottom-1/3 right-0 w-[350px] h-[350px] bg-accent-purple/8 rounded-full blur-[100px]" />
                <div className="bg-orb absolute top-2/3 left-0 w-[300px] h-[300px] bg-green-500/5 rounded-full blur-[90px]" />

                {/* Vertical lines */}
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="grid-line absolute top-0 bottom-0 w-px bg-white/5"
                        style={{ left: `${(i + 1) * 20}%` }}
                    />
                ))}
            </>
        ),
        contact: (
            <>
                {/* Central glow */}
                <div className="bg-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[180px]" />
                <div className="bg-orb absolute top-1/4 right-1/4 w-[200px] h-[200px] bg-accent-purple/10 rounded-full blur-[80px]" />
                <div className="bg-orb absolute bottom-1/4 left-1/4 w-[200px] h-[200px] bg-green-500/8 rounded-full blur-[80px]" />

                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="particle absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${100 + Math.random() * 20}%`
                        }}
                    />
                ))}
            </>
        )
    };

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {variants[variant] || variants.default}
        </div>
    );
};

export default AnimatedBackground;
