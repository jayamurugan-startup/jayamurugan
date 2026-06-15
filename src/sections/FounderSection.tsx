import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STARTUP_JOURNEY = [
  { phase: 'IDEA', description: 'Identifying problems worth solving with technology', year: 'Phase 1' },
  { phase: 'BUILD', description: 'Rapid prototyping with Python, Node.js, and modern frameworks', year: 'Phase 2' },
  { phase: 'SECURE', description: 'Implementing cybersecurity best practices and Kali Linux audits', year: 'Phase 3' },
  { phase: 'SCALE', description: 'Deploying on Linux cloud infrastructure with MySQL and Docker', year: 'Phase 4' },
  { phase: 'WEB3', description: 'Integrating blockchain, smart contracts, and decentralized features', year: 'Phase 5' },
];

export default function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelector('.founder-header'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      }
    );

    gsap.fromTo(
      section.querySelector('.founder-content'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    );

    const phases = section.querySelectorAll('.phase-item');
    gsap.fromTo(
      phases,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section.querySelector('.phases-container'),
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section || t.trigger === section.querySelector('.phases-container')) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-black py-20 md:py-32 px-4 md:px-8"
      style={{ borderTop: '1px solid #0A5C0A' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="founder-header mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-pixel text-2xl md:text-3xl" style={{ color: '#1FF21F' }}>
              &gt;_
            </span>
            <h2 
              className="font-pixel text-3xl md:text-5xl font-bold"
              style={{ 
                color: '#1FF21F',
                textShadow: '0 0 10px rgba(31, 242, 31, 0.5)',
              }}
            >
              FOUNDER & STARTUP BUILDER
            </h2>
          </div>
          <p className="font-mono-tech text-sm md:text-base" style={{ color: '#0A5C0A' }}>
            // From code to company — building the future
          </p>
        </div>

        {/* Founder Content */}
        <div className="founder-content mb-16">
          <div 
            className="p-6 md:p-8 border"
            style={{ 
              borderColor: '#0A5C0A',
              background: 'rgba(10, 25, 10, 0.3)',
            }}
          >
            <p className="font-mono-tech text-sm md:text-base leading-relaxed mb-4" style={{ color: '#1FF21F' }}>
              Beyond writing code, I&apos;m a <strong style={{ color: '#ffffff' }}>startup founder</strong> who transforms ideas into 
              products and products into companies. My technical foundation in <strong style={{ color: '#ffffff' }}>Python</strong>,{' '}
              <strong style={{ color: '#ffffff' }}>C/C++</strong>, <strong style={{ color: '#ffffff' }}>JavaScript</strong>, and{' '}
              <strong style={{ color: '#ffffff' }}>Node.js</strong> combined with cybersecurity expertise gives me a unique 
              advantage in building secure, scalable tech startups from the ground up.
            </p>
            <p className="font-mono-tech text-sm md:text-base leading-relaxed mb-4" style={{ color: '#1FF21F' }}>
              I&apos;ve worked across the full technology spectrum — from low-level systems programming in <strong style={{ color: '#ffffff' }}>C</strong> 
              and <strong style={{ color: '#ffffff' }}>C++</strong> to high-level web applications with <strong style={{ color: '#ffffff' }}>Django</strong> 
              and <strong style={{ color: '#ffffff' }}>Flask</strong>, from database architecture with <strong style={{ color: '#ffffff' }}>MySQL</strong> 
              to decentralized applications on the blockchain. This breadth allows me to architect complete solutions 
              and lead technical teams effectively.
            </p>
            <p className="font-mono-tech text-sm md:text-base leading-relaxed" style={{ color: '#1FF21F' }}>
              My experience with <strong style={{ color: '#ffffff' }}>Blender 3D</strong> adds creative visualization capabilities 
              to my technical stack, enabling me to create compelling prototypes and visual content for products. 
              Whether it&apos;s a SaaS platform, a Web3 protocol, or a cybersecurity tool, I bring founder mindset 
              and engineering excellence to every venture.
            </p>
          </div>
        </div>

        {/* Startup Journey Phases */}
        <div className="phases-container">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-pixel text-xl" style={{ color: '#1FF21F' }}>
              &gt;_
            </span>
            <h3 
              className="font-pixel text-2xl md:text-3xl font-bold"
              style={{ color: '#1FF21F' }}
            >
              STARTUP JOURNEY
            </h3>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div 
              className="absolute left-4 md:left-6 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(180deg, #1FF21F, #0A5C0A)' }}
            />

            <div className="space-y-6">
              {STARTUP_JOURNEY.map((phase, i) => (
                <div 
                  key={i}
                  className="phase-item flex items-start gap-4 md:gap-6 relative pl-12 md:pl-16"
                >
                  {/* Node */}
                  <div 
                    className="absolute left-2 md:left-4 w-4 h-4 rounded-full border-2 flex-shrink-0"
                    style={{ 
                      borderColor: '#1FF21F',
                      background: '#000000',
                      boxShadow: '0 0 10px rgba(31, 242, 31, 0.5)',
                      top: '4px',
                    }}
                  />

                  <div 
                    className="flex-1 p-4 border"
                    style={{ 
                      borderColor: '#0A5C0A',
                      background: 'rgba(10, 25, 10, 0.3)',
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span 
                        className="font-pixel text-lg"
                        style={{ color: '#ffffff' }}
                      >
                        {phase.phase}
                      </span>
                      <span 
                        className="font-mono-tech text-xs"
                        style={{ color: '#0A5C0A' }}
                      >
                        {phase.year}
                      </span>
                    </div>
                    <p 
                      className="font-mono-tech text-xs md:text-sm"
                      style={{ color: '#1FF21F' }}
                    >
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Founder Keywords */}
        <div className="mt-16 p-4 border" style={{ borderColor: '#0A5C0A', background: 'rgba(10, 25, 10, 0.2)' }}>
          <p className="font-mono-tech text-xs mb-3" style={{ color: '#0A5C0A' }}>
            // FOUNDER KEYWORDS
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'startup founder Arni',
              'tech entrepreneur Tamil Nadu',
              'software company founder',
              'tech startup India',
              'Jayamurugan founder',
              'startup developer',
              'product builder',
              'technical co-founder',
              'CTO services',
              'tech leadership',
              'venture builder',
              'startup consultant',
            ].map((keyword, i) => (
              <span 
                key={i}
                className="font-mono-tech text-xs px-2 py-1 border"
                style={{ 
                  color: '#0A5C0A',
                  borderColor: '#0A5C0A',
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
