import { useState, useEffect, useCallback } from 'react';
import CRTOverlay from './components/CRTOverlay';
import BootSequence from './sections/BootSequence';
import DesktopMetaphor from './sections/DesktopMetaphor';
import MatrixRain from './sections/MatrixRain';
import SkillsDashboard from './sections/SkillsDashboard';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import FounderSection from './sections/FounderSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

type AppPhase = 'boot' | 'desktop' | 'matrix' | 'content';

function App() {
  const [phase, setPhase] = useState<AppPhase>('boot');
  const [showContent, setShowContent] = useState(false);

  const handleBootComplete = useCallback(() => {
    setPhase('desktop');
  }, []);

  const handleEnterMatrix = useCallback(() => {
    setPhase('matrix');
  }, []);

  const handleMatrixComplete = useCallback(() => {
    setPhase('content');
    setShowContent(true);
  }, []);

  // Smooth scroll behavior
  useEffect(() => {
    if (phase === 'content') {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }, [phase]);

  return (
    <main>
      {/* CRT Scanline Overlay - always on top */}
      <CRTOverlay />

      {/* Phase 1: Boot Sequence */}
      {phase === 'boot' && (
        <BootSequence onComplete={handleBootComplete} />
      )}

      {/* Phase 2: Desktop Metaphor */}
      {(phase === 'desktop' || phase === 'matrix' || phase === 'content') && (
        <DesktopMetaphor onEnterMatrix={handleEnterMatrix} />
      )}

      {/* Phase 3: Matrix Rain */}
      {phase === 'matrix' && (
        <MatrixRain onComplete={handleMatrixComplete} />
      )}

      {/* Phase 4: Content Sections */}
      {showContent && (
        <div className="relative z-10">
          {/* Hero text overlay */}
          <section className="min-h-[50vh] flex items-center justify-center bg-black px-4">
            <div className="text-center">
              <h1 
                className="font-pixel text-4xl md:text-6xl lg:text-8xl font-bold mb-4"
                style={{ 
                  color: '#1FF21F',
                  textShadow: '0 0 20px rgba(31, 242, 31, 0.8), 0 0 40px rgba(31, 242, 31, 0.4)',
                }}
              >
                JAYAMURUGAN
              </h1>
              <p 
                className="font-mono-tech text-sm md:text-lg mb-2"
                style={{ color: '#1FF21F' }}
              >
                Software Engineer | Founder | Security Enthusiast
              </p>
              <p 
                className="font-mono-tech text-xs md:text-sm"
                style={{ color: '#0A5C0A' }}
              >
                Arni, Tamil Nadu, India
              </p>
              <div 
                className="mt-8 font-mono-tech text-xs"
                style={{ color: '#0A5C0A' }}
              >
                {'< scroll to explore />'}
              </div>
            </div>
          </section>

          <SkillsDashboard />
          <AboutSection />
          <ServicesSection />
          <FounderSection />
          <ContactSection />
          <Footer />
        </div>
      )}
    </main>
  );
}

export default App;
