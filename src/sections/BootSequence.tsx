import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: 'BIOS DATE 06/15/26 14:22:51 VER 1.0.4', color: '#8899aa' },
  { text: 'CPU: JAYAMURUGAN_CORE i9-14900K @ 6.0GHz', color: '#1FF21F' },
  { text: 'Detecting Primary Master ... JAYAMURUGAN_SSD 2TB', color: '#1FF21F' },
  { text: 'Detecting Primary Slave  ... EXPERIENCE_HDD 10TB', color: '#1FF21F' },
  { text: '', color: '#1FF21F' },
  { text: 'MEMORY TEST: 65536KB OK', color: '#1FF21F' },
  { text: 'Loading kernel modules ...', color: '#1FF21F' },
  { text: '[████████████] 100%', color: '#1FF21F' },
  { text: '', color: '#1FF21F' },
  { text: '> SYSTEM BOOT SEQUENCE INITIATED...', color: '#FFFFFF' },
  { text: '> LOANDING JAYAMURUGAN_KERNEL v9.9.9...', color: '#1FF21F' },
  { text: '> MOUNTING SKILL_VOLUMES...', color: '#1FF21F' },
  { text: '> PYTHON_MODULE     ... [MOUNTED]', color: '#1FF21F' },
  { text: '> C_CPP_MODULE      ... [MOUNTED]', color: '#1FF21F' },
  { text: '> JAVA_MODULE       ... [MOUNTED]', color: '#1FF21F' },
  { text: '> NODE_JS_MODULE    ... [MOUNTED]', color: '#1FF21F' },
  { text: '> PHP_MODULE        ... [MOUNTED]', color: '#1FF21F' },
  { text: '> LINUX_KERNEL      ... [MOUNTED]', color: '#1FF21F' },
  { text: '> KALI_SECURITY     ... [MOUNTED]', color: '#1FF21F' },
  { text: '> WEB3_BLOCKCHAIN   ... [MOUNTED]', color: '#1FF21F' },
  { text: '> BLENDER_3D        ... [MOUNTED]', color: '#1FF21F' },
  { text: '> MYSQL_DATABASE    ... [MOUNTED]', color: '#1FF21F' },
  { text: '> DJANGO_FLASK      ... [MOUNTED]', color: '#1FF21F' },
  { text: '', color: '#1FF21F' },
  { text: '> CHECKING NEURAL_NETWORK... 64TB OK', color: '#1FF21F' },
  { text: '> LOADING USER PROFILE: JAYAMURUGAN', color: '#FFFFFF' },
  { text: '> ROLE   : SOFTWARE ENGINEER', color: '#1FF21F' },
  { text: '> STATUS : FOUNDER & STARTUP BUILDER', color: '#1FF21F' },
  { text: '> FOCUS  : WEB3 | CYBERSECURITY | STARTUPS', color: '#1FF21F' },
  { text: '> LOC    : ARNI, TAMIL NADU, INDIA', color: '#1FF21F' },
  { text: '', color: '#1FF21F' },
  { text: '> ALL SYSTEMS OPERATIONAL.', color: '#1FF21F' },
  { text: '> STARTUP SEQUENCE COMPLETE.', color: '#00FF00' },
  { text: '', color: '#1FF21F' },
  { text: 'PRESS [ENTER] OR CLICK TO CONTINUE...', color: '#1FF21F' },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(true);
  const [readyToExit, setReadyToExit] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < BOOT_LINES.length) {
        setVisibleLines(lineIndex + 1);
        lineIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setReadyToExit(true), 500);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleExit = () => {
    if (!readyToExit) return;
    const el = containerRef.current;
    if (!el) return;
    
    gsap.to(el, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete,
    });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleExit();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [readyToExit]);

  return (
    <div
      ref={containerRef}
      onClick={handleExit}
      className="fixed inset-0 z-[100] bg-black flex items-start justify-start p-8 md:p-16 overflow-auto"
      style={{ cursor: readyToExit ? 'pointer' : 'default' }}
    >
      <div className="w-full max-w-4xl">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="font-mono-tech text-sm md:text-base leading-relaxed whitespace-pre-wrap break-all"
            style={{ 
              color: line.color,
              animation: 'flicker 0.1s ease-in-out',
            }}
          >
            {line.text}
            {i === visibleLines - 1 && (
              <span 
                className="inline-block w-[10px] h-[18px] ml-1 align-middle"
                style={{ 
                  backgroundColor: showCursor ? '#1FF21F' : 'transparent',
                  opacity: showCursor ? 1 : 0,
                }}
              />
            )}
          </div>
        ))}
        {readyToExit && (
          <div 
            className="mt-4 font-mono-tech text-sm animate-pulse"
            style={{ color: '#1FF21F' }}
          >
            [ CLICK ANYWHERE OR PRESS ENTER ]
          </div>
        )}
      </div>
    </div>
  );
}
