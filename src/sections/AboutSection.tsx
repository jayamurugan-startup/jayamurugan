import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EVOLUTION_STEPS = [
  { from: 'C', to: 'C++', label: 'Object Oriented', year: '1985' },
  { from: 'C++', to: 'C#', label: '.NET Framework', year: '2000' },
  { from: 'C', to: 'Java', label: 'Write Once Run Anywhere', year: '1995' },
  { from: 'C', to: 'Python', label: 'Simplicity & Power', year: '1991' },
  { from: 'Python', to: 'Django', label: 'Web Framework', year: '2005' },
  { from: 'Python', to: 'Flask', label: 'Micro Framework', year: '2010' },
  { from: 'JS', to: 'Node.js', label: 'Server-side JS', year: '2009' },
  { from: 'Node.js', to: 'React', label: 'UI Library', year: '2013' },
  { from: 'Code', to: 'Web3', label: 'Decentralized', year: '2020' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const evolutionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const evolution = evolutionRef.current;
    if (!section || !evolution) return;

    // Header animation
    gsap.fromTo(
      section.querySelector('.about-header'),
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

    // Bio text animation
    gsap.fromTo(
      section.querySelector('.about-bio'),
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

    // Evolution steps animation
    const steps = evolution.querySelectorAll('.evolution-step');
    steps.forEach((step, i) => {
      gsap.fromTo(
        step,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: evolution,
            start: 'top 75%',
          },
        }
      );
    });

    // Connectors animation
    const connectors = evolution.querySelectorAll('.evolution-connector');
    connectors.forEach((conn, i) => {
      gsap.fromTo(
        conn,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.4,
          delay: i * 0.1 + 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: evolution,
            start: 'top 75%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section || t.trigger === evolution) {
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
        <div className="about-header mb-12">
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
              ABOUT ME
            </h2>
          </div>
          <p className="font-mono-tech text-sm md:text-base" style={{ color: '#0A5C0A' }}>
            // The story of a developer, founder, and security enthusiast
          </p>
        </div>

        {/* Bio */}
        <div className="about-bio mb-16">
          <div 
            className="p-6 md:p-8 border"
            style={{ 
              borderColor: '#0A5C0A',
              background: 'rgba(10, 25, 10, 0.3)',
            }}
          >
            <p className="font-mono-tech text-sm md:text-base leading-relaxed mb-4" style={{ color: '#1FF21F' }}>
              Hello, World! I&apos;m <strong style={{ color: '#ffffff' }}>Jayamurugan</strong>, a software engineer, founder, and security enthusiast 
              based in <strong style={{ color: '#ffffff' }}>Arni, Tamil Nadu, India</strong>. My journey in tech started with curiosity 
              and evolved into a multi-disciplinary expertise spanning programming languages, cybersecurity, 
              blockchain technology, and startup building.
            </p>
            <p className="font-mono-tech text-sm md:text-base leading-relaxed mb-4" style={{ color: '#1FF21F' }}>
              I specialize in building digital experiences that are secure, scalable, and innovative. 
              From writing low-level C code to deploying decentralized applications on the blockchain, 
              I thrive at the intersection of technology and creativity. My work with <strong style={{ color: '#ffffff' }}>Kali Linux</strong> and 
              penetration testing gives me a unique security-first perspective in every project I undertake.
            </p>
            <p className="font-mono-tech text-sm md:text-base leading-relaxed" style={{ color: '#1FF21F' }}>
              As a <strong style={{ color: '#ffffff' }}>startup founder</strong>, I understand the full lifecycle of product development — 
              from ideation and architecture to deployment and scaling. Whether it&apos;s a Web3 dApp, 
              a machine learning pipeline, or a 3D visualization in Blender, I bring passion and precision 
              to every line of code.
            </p>
          </div>
        </div>

        {/* Tech Evolution */}
        <div ref={evolutionRef}>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-pixel text-xl" style={{ color: '#1FF21F' }}>
              &gt;_
            </span>
            <h3 
              className="font-pixel text-2xl md:text-3xl font-bold"
              style={{ color: '#1FF21F' }}
            >
              TECH EVOLUTION
            </h3>
          </div>
          <p className="font-mono-tech text-xs mb-8" style={{ color: '#0A5C0A' }}>
            // How programming languages evolved and interconnected
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EVOLUTION_STEPS.map((step, i) => (
              <div 
                key={i}
                className="evolution-step p-4 border relative overflow-hidden group"
                style={{ 
                  borderColor: '#0A5C0A',
                  background: 'rgba(10, 25, 10, 0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1FF21F';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(31, 242, 31, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#0A5C0A';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span 
                    className="font-pixel text-lg"
                    style={{ color: '#1FF21F' }}
                  >
                    {step.from}
                  </span>
                  <div 
                    className="evolution-connector flex-1 mx-3 h-px origin-left"
                    style={{ 
                      background: 'linear-gradient(90deg, #1FF21F, #0A5C0A)',
                    }}
                  />
                  <span 
                    className="font-pixel text-lg"
                    style={{ color: '#ffffff' }}
                  >
                    {step.to}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span 
                    className="font-mono-tech text-xs"
                    style={{ color: '#0A5C0A' }}
                  >
                    {step.label}
                  </span>
                  <span 
                    className="font-mono-tech text-xs"
                    style={{ color: '#0A5C0A' }}
                  >
                    {step.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keywords for SEO */}
        <div className="mt-16 p-4 border" style={{ borderColor: '#0A5C0A', background: 'rgba(10, 25, 10, 0.2)' }}>
          <p className="font-mono-tech text-xs mb-3" style={{ color: '#0A5C0A' }}>
            // KEYWORDS
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'Jayamurugan software developer Arni',
              'software engineer Tamil Nadu',
              'freelance developer India',
              'Python developer Arni',
              'C C++ developer',
              'Java developer',
              'JavaScript developer',
              'PHP developer',
              'Node.js developer',
              'full stack developer Arni',
              'web developer Arni Saidapet',
              'app developer Tamil Nadu',
              'cybersecurity expert',
              'Kali Linux specialist',
              'blockchain developer',
              'Web3 developer India',
              'crypto developer',
              'smart contract developer',
              'startup founder',
              'tech entrepreneur',
              'Blender 3D artist',
              'MySQL database expert',
              'Django developer',
              'Flask developer',
              'Linux administrator',
              'software development company Arni',
              'IT consultant Tamil Nadu',
              'digital solutions provider',
              'web application developer',
              'mobile application developer',
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
