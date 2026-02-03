import React, { useRef, useEffect, useCallback, useState } from 'react';

const ParticleField = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef([]);
    const animationRef = useRef(null);
    const [isDark, setIsDark] = useState(true);

    const PARTICLE_COUNT = 150;
    const MOUSE_RADIUS = 120;
    const CONNECTION_DISTANCE = 100;

    // Watch for theme changes
    useEffect(() => {
        const checkTheme = () => {
            setIsDark(!document.documentElement.classList.contains('light'));
        };

        checkTheme();

        // Create observer to watch for class changes on html element
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    // Dynamic colors based on theme
    const getParticleColor = () => isDark ? 'rgba(96, 165, 250, 0.6)' : 'rgba(59, 130, 246, 0.5)';
    const getLineColor = (opacity) => isDark
        ? `rgba(96, 165, 250, ${opacity})`
        : `rgba(59, 130, 246, ${opacity * 0.8})`;

    class Particle {
        constructor(canvas) {
            this.canvas = canvas;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.baseX = this.x;
            this.baseY = this.y;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.density = Math.random() * 30 + 1;
        }

        update(mouse) {
            // Calculate distance from mouse
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Repel particles from mouse
            if (distance < MOUSE_RADIUS) {
                const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
                const angle = Math.atan2(dy, dx);
                const pushX = Math.cos(angle) * force * this.density * 0.5;
                const pushY = Math.sin(angle) * force * this.density * 0.5;

                this.x -= pushX;
                this.y -= pushY;
            } else {
                // Return to base position slowly
                if (this.x !== this.baseX) {
                    const dx = this.baseX - this.x;
                    this.x += dx * 0.05;
                }
                if (this.y !== this.baseY) {
                    const dy = this.baseY - this.y;
                    this.y += dy * 0.05;
                }
            }

            // Add slight floating movement
            this.baseX += this.speedX;
            this.baseY += this.speedY;

            // Bounce off edges
            if (this.baseX < 0 || this.baseX > this.canvas.width) {
                this.speedX *= -1;
            }
            if (this.baseY < 0 || this.baseY > this.canvas.height) {
                this.speedY *= -1;
            }

            // Keep particles in bounds
            this.baseX = Math.max(0, Math.min(this.canvas.width, this.baseX));
            this.baseY = Math.max(0, Math.min(this.canvas.height, this.baseY));
        }

        draw(ctx, color) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }

    const initParticles = useCallback((canvas) => {
        particlesRef.current = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particlesRef.current.push(new Particle(canvas));
        }
    }, []);

    const drawConnections = useCallback((ctx, particles, getLineColorFn) => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONNECTION_DISTANCE) {
                    const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.3;
                    ctx.beginPath();
                    ctx.strokeStyle = getLineColorFn(opacity);
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const particleColor = getParticleColor();

        // Update and draw particles with theme color
        particlesRef.current.forEach(particle => {
            particle.update(mouseRef.current);
            particle.draw(ctx, particleColor);
        });

        // Draw connections between nearby particles
        drawConnections(ctx, particlesRef.current, getLineColor);

        animationRef.current = requestAnimationFrame(animate);
    }, [drawConnections, isDark]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles(canvas);
        };

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        // Initial setup
        handleResize();

        // Start animation
        animate();

        // Event listeners
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [initParticles, animate]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'transparent' }}
        />
    );
};

export default ParticleField;
