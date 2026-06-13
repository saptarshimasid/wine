'use client';

import React, { useEffect, useRef } from 'react';

class Bubble {
  x: number = 0;
  y: number = 0;
  r: number = 0;
  vy: number = 0;
  swingSpeed: number = 0;
  swingAmplitude: number = 0;
  swingOffset: number = 0;
  alpha: number = 0;
  width: number;
  height: number;

  constructor(width: number, height: number, initAtRandomY = false) {
    this.width = width;
    this.height = height;
    this.reset(initAtRandomY);
  }

  reset(randomY = false) {
    this.x = Math.random() * this.width;
    this.y = randomY ? Math.random() * this.height : this.height + 15 + Math.random() * 30;
    this.r = 1 + Math.random() * 3.5;
    this.vy = -(0.3 + Math.random() * 0.9);
    this.swingSpeed = 0.008 + Math.random() * 0.02;
    this.swingAmplitude = 0.2 + Math.random() * 0.5;
    this.swingOffset = Math.random() * Math.PI * 2;
    this.alpha = 0.2 + Math.random() * 0.4;
  }

  update(mouseX: number, mouseY: number, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.swingOffset += this.swingSpeed;
    
    // Base movement
    this.y += this.vy;
    this.x += Math.sin(this.swingOffset) * this.swingAmplitude;

    // Mouse repulsion
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      const force = (120 - dist) / 120;
      const angle = Math.atan2(dy, dx);
      // Gentle push away
      this.x += Math.cos(angle) * force * 2.0;
      this.y += Math.sin(angle) * force * 1.0;
    }

    // Reset if out of bounds
    if (this.y < -10 || this.x < -10 || this.x > this.width + 10) {
      this.reset(false);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    
    // Bubble outline
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(230, 185, 80, ${this.alpha})`;
    ctx.lineWidth = 0.75;
    ctx.stroke();

    // Subtle golden glow fill
    ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha * 0.06})`;
    ctx.fill();

    // Highlighting white reflection crescent
    ctx.beginPath();
    ctx.arc(this.x - this.r * 0.35, this.y - this.r * 0.35, this.r * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.75})`;
    ctx.fill();

    ctx.restore();
  }
}

class Mist {
  x: number = 0;
  y: number = 0;
  r: number = 0;
  vx: number = 0;
  vy: number = 0;
  alpha: number = 0;
  maxAlpha: number = 0;
  decay: number = 0;
  width: number;
  height: number;

  constructor(width: number, height: number, initAtRandomAlpha = false) {
    this.width = width;
    this.height = height;
    this.reset(initAtRandomAlpha);
  }

  reset(randomAlpha = false) {
    this.x = Math.random() * this.width;
    // Keep dry ice mist at the lower 45% of the viewport screen
    this.y = this.height * 0.65 + Math.random() * (this.height * 0.35 + 20);
    this.r = 75 + Math.random() * 105;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = -(0.08 + Math.random() * 0.2);
    this.maxAlpha = 0.012 + Math.random() * 0.025;
    this.alpha = randomAlpha ? Math.random() * this.maxAlpha : 0.001; // Start faint and bloom
    this.decay = 0.0001 + Math.random() * 0.00022;
  }

  update(mouseX: number, mouseY: number, width: number, height: number) {
    this.width = width;
    this.height = height;

    // Fade in initially, then fade out
    if (this.alpha < this.maxAlpha && this.y > this.height * 0.75) {
      this.alpha += 0.0008;
    } else {
      this.alpha -= this.decay;
    }

    // Apply friction and move
    this.vx *= 0.95;
    this.vy *= 0.95;
    
    // Add default drift velocities
    this.x += this.vx + (Math.random() - 0.5) * 0.12;
    this.y += this.vy - 0.04;

    // Mouse Vector Repulsion
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 200) {
      const force = (200 - dist) / 200;
      const angle = Math.atan2(dy, dx);
      // Accelerate away from mouse
      this.vx += Math.cos(angle) * force * 0.7;
      this.vy += Math.sin(angle) * force * 0.4;
    }

    // Check bounds or complete dissipation
    if (this.alpha <= 0 || this.y < this.height * 0.4 || this.x < -120 || this.x > this.width + 120) {
      this.reset(false);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.alpha <= 0) return;
    
    ctx.save();
    
    // Create radial gradient for soft blurry puff
    const grad = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.r
    );

    // Dynamic tint: golden glow reflection near the bottom, off-white above
    const isGolden = this.y > this.height * 0.75;
    const rgb = isGolden ? '212, 175, 55' : '235, 230, 220';
    
    grad.addColorStop(0, `rgba(${rgb}, ${this.alpha})`);
    grad.addColorStop(0.4, `rgba(${rgb}, ${this.alpha * 0.6})`);
    grad.addColorStop(0.8, `rgba(${rgb}, ${this.alpha * 0.15})`);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    // Track mouse globally
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initialize particles (scaled down on mobile for high-performance 60 FPS)
    const isMobile = width < 768;
    const bubbleCount = isMobile ? 50 : 140;
    const mistCount = isMobile ? 20 : 55;
    const bubbles: Bubble[] = [];
    const mists: Mist[] = [];

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble(width, height, true));
    }
    for (let i = 0; i < mistCount; i++) {
      mists.push(new Mist(width, height, true));
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mPos = mousePosRef.current;

      // Update and draw dry ice mist first (background)
      for (let i = 0; i < mists.length; i++) {
        mists[i].update(mPos.x, mPos.y, width, height);
        mists[i].draw(ctx);
      }

      // Update and draw golden carbonation bubbles (foreground)
      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update(mPos.x, mPos.y, width, height);
        bubbles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 bg-[#070708] overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen"
      />
    </div>
  );
}
