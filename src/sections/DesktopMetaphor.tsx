import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface DesktopMetaphorProps {
  onEnterMatrix: () => void;
}

export default function DesktopMetaphor({ onEnterMatrix }: DesktopMetaphorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [windowOpen, setWindowOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
    );

    tl.add(() => setWindowOpen(true), 0.6);
  }, []);

  useEffect(() => {
    if (windowOpen && windowRef.current) {
      gsap.fromTo(
        windowRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [windowOpen]);

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
    if (icon === 'readme') {
      setWindowOpen(true);
    }
  };

  const handleKnowMore = () => {
    // Glitch transition to matrix
    const el = containerRef.current;
    if (!el) return;
    
    gsap.to(el, {
      opacity: 0,
      scale: 1.2,
      filter: 'blur(20px) hue-rotate(90deg)',
      duration: 0.6,
      ease: 'power2.in',
      onComplete: onEnterMatrix,
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50"
      style={{
        background: 'radial-gradient(ellipse at center, #1a1a3e 0%, #0a0a1a 50%, #000000 100%)',
        opacity: 0,
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute left-4 md:left-8 top-20 flex flex-col gap-6 md:gap-8">
        <DesktopIcon
          icon="/images/icon_computer.png"
          label="My Computer"
          selected={selectedIcon === 'computer'}
          onClick={() => handleIconClick('computer')}
        />
        <DesktopIcon
          icon="/images/icon_cd.png"
          label="Projects"
          selected={selectedIcon === 'cd'}
          onClick={() => handleIconClick('cd')}
        />
        <DesktopIcon
          icon="/images/icon_dir.png"
          label="Documents"
          selected={selectedIcon === 'dir'}
          onClick={() => handleIconClick('dir')}
        />
      </div>

      {/* ReadMe Window */}
      {windowOpen && (
        <div
          ref={windowRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px]"
          style={{
            background: '#c0c0c0',
            border: '2px solid #ffffff',
            borderRightColor: '#404040',
            borderBottomColor: '#404040',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.5)',
          }}
        >
          {/* Window Title Bar */}
          <div 
            className="px-2 py-1 flex items-center justify-between"
            style={{
              background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
            }}
          >
            <span className="text-white font-bold text-sm flex items-center gap-2">
              <span className="text-xs">📄</span>
              ReadMe.txt - Notepad
            </span>
            <div className="flex gap-1">
              <WindowButton label="_" />
              <WindowButton label="□" />
              <WindowButton label="×" onClick={() => setWindowOpen(false)} />
            </div>
          </div>

          {/* Menu Bar */}
          <div className="flex gap-4 px-2 py-1 text-xs" style={{ background: '#c0c0c0' }}>
            <span className="underline cursor-pointer">F</span>ile
            <span className="underline cursor-pointer">E</span>dit
            <span className="underline cursor-pointer">S</span>earch
            <span className="underline cursor-pointer">H</span>elp
          </div>

          {/* Window Content */}
          <div 
            className="p-4 font-mono-tech text-sm leading-relaxed"
            style={{ 
              background: '#ffffff', 
              color: '#000000',
              minHeight: '300px',
            }}
          >
            <div className="mb-4">
              <span className="text-gray-500">Name:</span>{' '}
              <strong>Jayamurugan</strong>
            </div>
            <div className="mb-4">
              <span className="text-gray-500">Role:</span>{' '}
              Software Engineer | Founder | Security Enthusiast
            </div>
            <div className="mb-4">
              <span className="text-gray-500">Location:</span>{' '}
              Arni, Tamil Nadu, India
            </div>
            <div className="mb-6">
              <span className="text-gray-500">Focus:</span>{' '}
              Web3, Cybersecurity, Startups, Full Stack Development
            </div>
            <div className="mb-4 text-gray-600 italic">
              "Building the future, one line of code at a time."
            </div>
            <div className="text-xs text-gray-400">
              Languages: Python, C, C++, C#, Java, JavaScript, Node.js, PHP, MySQL
            </div>
            <div className="text-xs text-gray-400">
              Tools: Linux, Kali Linux, Blender, Flask, Django, Web3, Blockchain
            </div>
            
            {/* CTA Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleKnowMore}
                className="px-6 py-2 font-mono-tech text-sm font-bold transition-all duration-300 hover:brightness-110 active:translate-y-0.5"
                style={{
                  background: '#c0c0c0',
                  border: '2px solid #ffffff',
                  borderRightColor: '#404040',
                  borderBottomColor: '#404040',
                  color: '#000000',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#d4d4d4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#c0c0c0';
                }}
              >
                KNOW MORE ABOUT ME
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-10 flex items-center px-2 gap-2"
        style={{
          background: '#c0c0c0',
          borderTop: '2px solid #ffffff',
        }}
      >
        <button 
          className="px-3 py-1 font-bold text-sm flex items-center gap-1"
          style={{
            background: '#c0c0c0',
            border: '2px solid #ffffff',
            borderRightColor: '#404040',
            borderBottomColor: '#404040',
            cursor: 'pointer',
          }}
        >
          <span>🪟</span> Start
        </button>
        <div 
          className="flex-1 h-7 px-2 flex items-center text-xs gap-2"
          style={{
            background: '#c0c0c0',
            border: '2px inset #ffffff',
          }}
        >
          {windowOpen && (
            <span className="flex items-center gap-1">
              📄 ReadMe.txt
            </span>
          )}
        </div>
        <div 
          className="h-7 px-3 flex items-center text-xs"
          style={{
            background: '#c0c0c0',
            border: '2px inset #ffffff',
          }}
        >
          {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

function DesktopIcon({ 
  icon, 
  label, 
  selected, 
  onClick 
}: { 
  icon: string; 
  label: string; 
  selected: boolean; 
  onClick: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center gap-1 cursor-pointer w-20"
      onClick={onClick}
      style={{
        background: selected ? '#000080' : 'transparent',
        padding: '4px',
      }}
    >
      <img 
        src={icon} 
        alt={label} 
        className="w-10 h-10 object-contain"
        draggable={false}
      />
      <span 
        className="text-xs text-center leading-tight font-mono-tech"
        style={{
          color: selected ? '#ffffff' : '#ffffff',
          textShadow: '1px 1px 0 #000000',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function WindowButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-5 h-5 flex items-center justify-center text-xs font-bold"
      style={{
        background: '#c0c0c0',
        border: '1px solid #ffffff',
        borderRightColor: '#404040',
        borderBottomColor: '#404040',
        color: '#000000',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}
