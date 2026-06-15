import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const ALL_CHARS = CHARACTERS + KATAKANA;

interface MatrixRainProps {
  onComplete: () => void;
}

export default function MatrixRain({ onComplete }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<number[]>([]);
  const speedsRef = useRef<number[]>([]);
  const charsRef = useRef<string[][]>([]);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const phaseRef = useRef<'forming' | 'raining' | 'done'>('forming');

  const initMatrix = useCallback((canvas: HTMLCanvasElement) => {
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    dropsRef.current = new Array(columns).fill(0).map(() => Math.random() * -100);
    speedsRef.current = new Array(columns).fill(0).map(() => 0.5 + Math.random() * 2);
    charsRef.current = new Array(columns).fill(0).map(() =>
      new Array(50).fill(0).map(() => ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)])
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initMatrix(canvas);
    };
    resize();
    window.addEventListener('resize', resize);

    startTimeRef.current = Date.now();
    phaseRef.current = 'forming';

    const fontSize = 14;

    const draw = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      
      // Semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

      const drops = dropsRef.current;
      const speeds = speedsRef.current;
      const chars = charsRef.current;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        
        // Draw multiple characters in the column
        for (let j = 0; j < 3; j++) {
          const y = (drops[i] - j) * fontSize;
          if (y < 0 || y > canvas.height) continue;

          const charIndex = Math.floor(drops[i] - j) % chars[i].length;
          const char = chars[i][Math.abs(charIndex)] || ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];

          if (j === 0) {
            // Leading character - bright white
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#1FF21F';
            ctx.shadowBlur = 10;
          } else if (j === 1) {
            // Second character - bright green
            ctx.fillStyle = '#1FF21F';
            ctx.shadowColor = '#1FF21F';
            ctx.shadowBlur = 5;
          } else {
            // Trail characters - darker green
            const alpha = Math.max(0.1, 0.5 - j * 0.15);
            ctx.fillStyle = `rgba(31, 242, 31, ${alpha})`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, x, y);
        }

        ctx.shadowBlur = 0;

        // Move drop
        drops[i] += speeds[i];

        // Reset drop when it goes off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = 0.5 + Math.random() * 2;
        }
      }

      // Phase transitions
      if (elapsed > 8 && phaseRef.current === 'forming') {
        phaseRef.current = 'raining';
      }

      if (elapsed > 12 && phaseRef.current === 'raining') {
        phaseRef.current = 'done';
        // Fade out and complete
        gsap.to(container, {
          opacity: 0,
          duration: 1.5,
          delay: 1,
          onComplete,
        });
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [initMatrix, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-40 bg-black"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Floating 3D text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h2 
            className="font-pixel text-4xl md:text-6xl lg:text-8xl font-bold mb-4 matrix-glow"
            style={{ 
              color: '#1FF21F',
              textShadow: '0 0 10px #1FF21F, 0 0 20px #1FF21F, 0 0 40px #1FF21F',
              animation: 'flicker 0.1s infinite',
            }}
          >
            ENTER THE CODE
          </h2>
          <p 
            className="font-mono-tech text-lg md:text-2xl"
            style={{ 
              color: '#0A5C0A',
              textShadow: '0 0 5px #1FF21F',
            }}
          >
            EXPERT IN MULTI-LANGUAGE DEVELOPMENT
          </p>
        </div>
      </div>
    </div>
  );
}
