import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: '</>',
    title: 'Full Stack Web Development',
    description: 'End-to-end web application development using Python, JavaScript, Node.js, PHP, React, Django, Flask, and modern frameworks. From concept to deployment.',
    techs: ['React', 'Node.js', 'Python', 'Django', 'Flask', 'PHP', 'MySQL'],
  },
  {
    icon: '{ }',
    title: 'Software Development',
    description: 'Custom software solutions built with C, C++, C#, and Java. Desktop applications, system utilities, and enterprise-grade software tailored to your needs.',
    techs: ['C', 'C++', 'C#', 'Java', 'Python', 'XML'],
  },
  {
    icon: '◈',
    title: 'Mobile App Development',
    description: 'Cross-platform mobile applications for Android and iOS. Native and hybrid apps that deliver exceptional user experiences on every device.',
    techs: ['React Native', 'Java', 'Kotlin', 'Flutter'],
  },
  {
    icon: '◉',
    title: 'Cybersecurity Services',
    description: 'Security audits, penetration testing, vulnerability assessments using Kali Linux. Protect your digital assets with expert security analysis.',
    techs: ['Kali Linux', 'Penetration Testing', 'Security Audit', 'Network Security'],
  },
  {
    icon: '⬡',
    title: 'Blockchain & Web3 Development',
    description: 'Smart contract development, DApp creation, NFT platforms, DeFi solutions, and cryptocurrency integration. Build the decentralized future.',
    techs: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts', 'DeFi'],
  },
  {
    icon: '◐',
    title: 'Database Administration',
    description: 'Expert MySQL, PostgreSQL, MongoDB, and SQLite database design, optimization, and management. Ensure your data is secure, fast, and scalable.',
    techs: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis'],
  },
  {
    icon: '◇',
    title: 'Linux System Administration',
    description: 'Server setup, configuration, and management on Linux. DevOps automation, cloud deployment, and infrastructure management.',
    techs: ['Linux', 'Ubuntu', 'CentOS', 'Docker', 'AWS', 'Nginx'],
  },
  {
    icon: '▣',
    title: '3D & Creative Development',
    description: '3D modeling, animation, and visualization using Blender. Create stunning visual content for games, videos, and interactive experiences.',
    techs: ['Blender', '3D Modeling', 'Animation', 'Rendering'],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Header animation
    gsap.fromTo(
      section.querySelector('.services-header'),
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

    // Cards stagger animation
    const cards = section.querySelectorAll('.service-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section.querySelector('.services-grid'),
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section || t.trigger === section.querySelector('.services-grid')) {
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="services-header mb-12">
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
              SERVICES
            </h2>
          </div>
          <p className="font-mono-tech text-sm md:text-base" style={{ color: '#0A5C0A' }}>
            // Comprehensive tech solutions for every need
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="service-card p-6 border relative overflow-hidden group"
              style={{ 
                borderColor: '#0A5C0A',
                background: 'rgba(10, 25, 10, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1FF21F';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(31, 242, 31, 0.15), inset 0 0 20px rgba(31, 242, 31, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#0A5C0A';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Corner accent */}
              <div 
                className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, transparent 50%, #1FF21F 50%)',
                }}
              />

              <div className="flex items-start gap-4">
                <span 
                  className="font-pixel text-3xl flex-shrink-0"
                  style={{ 
                    color: '#1FF21F',
                    textShadow: '0 0 10px rgba(31, 242, 31, 0.5)',
                  }}
                >
                  {service.icon}
                </span>
                <div>
                  <h3 
                    className="font-pixel text-lg md:text-xl font-bold mb-2"
                    style={{ color: '#ffffff' }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="font-mono-tech text-xs md:text-sm leading-relaxed mb-4"
                    style={{ color: '#1FF21F' }}
                  >
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.techs.map((tech, j) => (
                      <span
                        key={j}
                        className="font-mono-tech text-xs px-2 py-1 border"
                        style={{ 
                          color: '#0A5C0A',
                          borderColor: '#0A5C0A',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
