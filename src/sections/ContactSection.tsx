import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelector('.contact-header'),
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
      section.querySelector('.contact-form-container'),
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

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section) {
          t.kill();
        }
      });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-black py-20 md:py-32 px-4 md:px-8"
      style={{ borderTop: '1px solid #0A5C0A' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="contact-header text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
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
              GET IN TOUCH
            </h2>
          </div>
          <p className="font-mono-tech text-sm md:text-base" style={{ color: '#0A5C0A' }}>
            // Ready to build something amazing together?
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <ContactInfo 
            label="EMAIL"
            value="jayamurugan.startup@gmail.com"
            href="mailto:jayamurugan.startup@gmail.com"
          />
          <ContactInfo 
            label="LOCATION"
            value="Arni, Tamil Nadu, India"
          />
          <ContactInfo 
            label="AVAILABILITY"
            value="Open for projects"
          />
        </div>

        {/* Form */}
        <div className="contact-form-container">
          <form 
            onSubmit={handleSubmit}
            className="p-6 md:p-8 border"
            style={{ 
              borderColor: '#0A5C0A',
              background: 'rgba(10, 25, 10, 0.3)',
            }}
          >
            {submitted ? (
              <div className="text-center py-8">
                <div 
                  className="font-pixel text-2xl mb-4"
                  style={{ color: '#1FF21F' }}
                >
                  MESSAGE SENT!
                </div>
                <p className="font-mono-tech text-sm" style={{ color: '#0A5C0A' }}>
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label 
                      className="block font-mono-tech text-xs mb-2"
                      style={{ color: '#0A5C0A' }}
                    >
                      {'// NAME'}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 font-mono-tech text-sm border bg-transparent outline-none transition-colors"
                      style={{ 
                        borderColor: '#0A5C0A',
                        color: '#1FF21F',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#1FF21F';
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(31, 242, 31, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#0A5C0A';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label 
                      className="block font-mono-tech text-xs mb-2"
                      style={{ color: '#0A5C0A' }}
                    >
                      {'// EMAIL'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 font-mono-tech text-sm border bg-transparent outline-none transition-colors"
                      style={{ 
                        borderColor: '#0A5C0A',
                        color: '#1FF21F',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#1FF21F';
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(31, 242, 31, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#0A5C0A';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label 
                    className="block font-mono-tech text-xs mb-2"
                    style={{ color: '#0A5C0A' }}
                  >
                    {'// MESSAGE'}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 font-mono-tech text-sm border bg-transparent outline-none transition-colors resize-none"
                    style={{ 
                      borderColor: '#0A5C0A',
                      color: '#1FF21F',
                      minHeight: '150px',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#1FF21F';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(31, 242, 31, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#0A5C0A';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 font-pixel text-lg border transition-all duration-300 hover:brightness-110"
                  style={{ 
                    background: '#1FF21F',
                    color: '#000000',
                    borderColor: '#1FF21F',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(31, 242, 31, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  SEND_MESSAGE()
                </button>
              </>
            )}
          </form>
        </div>

        {/* Contact Keywords */}
        <div className="mt-12 p-4 border" style={{ borderColor: '#0A5C0A', background: 'rgba(10, 25, 10, 0.2)' }}>
          <p className="font-mono-tech text-xs mb-3" style={{ color: '#0A5C0A' }}>
            // HIRE ME FOR
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'hire software developer Arni',
              'hire Python developer',
              'hire C++ developer',
              'hire Java developer',
              'hire JavaScript developer',
              'hire Node.js developer',
              'hire PHP developer',
              'hire full stack developer',
              'hire web developer Tamil Nadu',
              'hire app developer',
              'hire blockchain developer',
              'hire Web3 developer',
              'hire cybersecurity expert',
              'hire Linux administrator',
              'hire database expert',
              'hire startup developer',
              'freelance software engineer',
              'remote developer India',
              'contract developer',
              'project based developer',
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

function ContactInfo({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div 
      className="p-4 border text-center"
      style={{ 
        borderColor: '#0A5C0A',
        background: 'rgba(10, 25, 10, 0.3)',
      }}
    >
      <div 
        className="font-mono-tech text-xs mb-2"
        style={{ color: '#0A5C0A' }}
      >
        {'// '}{label}
      </div>
      <div 
        className="font-mono-tech text-sm"
        style={{ color: '#1FF21F' }}
      >
        {value}
      </div>
    </div>
  );

  if (href) {
    return (
      <a 
        href={href}
        className="block transition-all duration-300 hover:brightness-125"
        style={{ textDecoration: 'none' }}
      >
        {content}
      </a>
    );
  }

  return content;
}
