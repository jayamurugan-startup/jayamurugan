import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  category: string;
}

const SKILLS: Skill[] = [
  // Programming Languages
  { name: 'Python', level: 95, category: 'Languages' },
  { name: 'C', level: 90, category: 'Languages' },
  { name: 'C++', level: 85, category: 'Languages' },
  { name: 'C#', level: 80, category: 'Languages' },
  { name: 'Java', level: 82, category: 'Languages' },
  { name: 'JavaScript', level: 92, category: 'Languages' },
  { name: 'PHP', level: 78, category: 'Languages' },
  { name: 'HTML / CSS', level: 95, category: 'Languages' },
  // Web Frameworks
  { name: 'Node.js', level: 90, category: 'Web' },
  { name: 'Flask', level: 88, category: 'Web' },
  { name: 'Django', level: 75, category: 'Web' },
  { name: 'React', level: 88, category: 'Web' },
  // Database
  { name: 'MySQL', level: 92, category: 'Database' },
  { name: 'MongoDB', level: 80, category: 'Database' },
  { name: 'PostgreSQL', level: 78, category: 'Database' },
  // Systems & Security
  { name: 'Linux', level: 88, category: 'Systems' },
  { name: 'Kali Linux', level: 82, category: 'Systems' },
  // 3D & Creative
  { name: 'Blender', level: 70, category: 'Creative' },
  // Web3 & Blockchain
  { name: 'Web3 / Blockchain', level: 78, category: 'Web3' },
  { name: 'Smart Contracts', level: 75, category: 'Web3' },
  { name: 'Crypto / DeFi', level: 80, category: 'Web3' },
];

const CATEGORIES = ['All', 'Languages', 'Web', 'Database', 'Systems', 'Creative', 'Web3'];

export default function SkillsDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [animatedLevels, setAnimatedLevels] = useState<Record<string, number>>({});

  const filteredSkills = activeCategory === 'All' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === activeCategory);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Animate skill bars on scroll
    const skillBars = section.querySelectorAll('.skill-bar');
    skillBars.forEach((bar) => {
      const skillName = bar.getAttribute('data-skill');
      const targetLevel = parseInt(bar.getAttribute('data-level') || '0');

      const trigger = ScrollTrigger.create({
        trigger: bar,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            bar.querySelector('.skill-bar-fill'),
            { width: '0%' },
            { 
              width: `${targetLevel}%`, 
              duration: 1.5, 
              ease: 'power3.out',
            }
          );
          // Animate the number counter
          const counter = { value: 0 };
          gsap.to(counter, {
            value: targetLevel,
            duration: 1.5,
            ease: 'power3.out',
            onUpdate: () => {
              setAnimatedLevels(prev => ({
                ...prev,
                [skillName || '']: Math.round(counter.value),
              }));
            },
          });
        },
      });
      triggers.push(trigger);
    });

    // Animate section header
    gsap.fromTo(
      section.querySelector('.skills-header'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    return () => {
      triggers.forEach(t => t.kill());
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section || skillBars.length && Array.from(skillBars).includes(t.trigger as Element)) {
          t.kill();
        }
      });
    };
  }, [filteredSkills]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-black py-20 md:py-32 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="skills-header mb-12">
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
              TECHNICAL PROFICIENCY
            </h2>
          </div>
          <p className="font-mono-tech text-sm md:text-base" style={{ color: '#0A5C0A' }}>
            // Multi-language expertise across systems, web, security, and blockchain
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 font-mono-tech text-xs md:text-sm border transition-all duration-300"
              style={{
                background: activeCategory === cat ? '#1FF21F' : 'transparent',
                color: activeCategory === cat ? '#000000' : '#1FF21F',
                borderColor: '#1FF21F',
                cursor: 'pointer',
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filteredSkills.map((skill) => (
            <div 
              key={skill.name}
              className="skill-bar"
              data-skill={skill.name}
              data-level={skill.level}
            >
              <div className="flex justify-between items-center mb-2">
                <span 
                  className="font-mono-tech text-sm md:text-base"
                  style={{ color: '#1FF21F' }}
                >
                  {skill.name}
                </span>
                <span 
                  className="font-mono-tech text-sm"
                  style={{ color: '#0A5C0A' }}
                >
                  {animatedLevels[skill.name] || 0}%
                </span>
              </div>
              <div 
                className="h-3 w-full relative overflow-hidden"
                style={{ 
                  background: '#0A0A0A',
                  border: '1px solid #0A5C0A',
                }}
              >
                <div 
                  className="skill-bar-fill h-full relative"
                  style={{ width: '0%' }}
                >
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1"
                    style={{ 
                      background: '#ffffff',
                      boxShadow: '0 0 10px #ffffff, 0 0 20px #1FF21F',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <StatBox label="LANGUAGES" value="8+" />
          <StatBox label="FRAMEWORKS" value="12+" />
          <StatBox label="YEARS EXP" value="5+" />
          <StatBox label="PROJECTS" value="50+" />
        </div>

        {/* Footer text */}
        <div 
          className="mt-12 text-center font-mono-tech text-xs"
          style={{ color: '#0A5C0A' }}
        >
          {'<Secure Connection // Encrypted />'}
        </div>
      </div>
    </section>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
        },
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      className="p-4 text-center border"
      style={{ 
        borderColor: '#0A5C0A',
        background: 'rgba(10, 25, 10, 0.5)',
      }}
    >
      <div 
        className="font-pixel text-3xl md:text-4xl font-bold mb-1"
        style={{ 
          color: '#1FF21F',
          textShadow: '0 0 10px rgba(31, 242, 31, 0.5)',
        }}
      >
        {value}
      </div>
      <div 
        className="font-mono-tech text-xs"
        style={{ color: '#0A5C0A' }}
      >
        {label}
      </div>
    </div>
  );
}
