export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative z-10 bg-black py-8 md:py-12 px-4 md:px-8"
      style={{ borderTop: '1px solid #0A5C0A' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="text-center md:text-left">
            <div 
              className="font-pixel text-xl md:text-2xl font-bold mb-2"
              style={{ color: '#1FF21F' }}
            >
              {'<JAYAMURUGAN />'}
            </div>
            <p 
              className="font-mono-tech text-xs"
              style={{ color: '#0A5C0A' }}
            >
              Software Engineer | Founder | Security Enthusiast
            </p>
          </div>

          <div className="flex gap-6">
            <FooterLink href="mailto:jayamurugan.startup@gmail.com" label="Email" />
            <FooterLink href="#" label="GitHub" />
            <FooterLink href="#" label="LinkedIn" />
            <FooterLink href="#" label="Twitter" />
          </div>
        </div>

        {/* Divider */}
        <div 
          className="h-px w-full mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, #0A5C0A, transparent)' }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p 
            className="font-mono-tech text-xs text-center md:text-left"
            style={{ color: '#0A5C0A' }}
          >
            &copy; {currentYear} Jayamurugan. All rights reserved. Built with React, TypeScript, and passion.
          </p>
          <p 
            className="font-mono-tech text-xs text-center"
            style={{ color: '#0A5C0A' }}
          >
            Arni, Tamil Nadu, India | jayamurugan.startup@gmail.com
          </p>
        </div>

        {/* SEO footer text */}
        <div className="mt-6 text-center">
          <p 
            className="font-mono-tech text-xs leading-relaxed"
            style={{ color: '#0A5C0A' }}
          >
            Jayamurugan - Software Developer in Arni Saidapet, Tamil Nadu, India. 
            Expert in Python, C, C++, C#, Java, JavaScript, Node.js, PHP, MySQL, Flask, Django, 
            Linux, Kali Linux, Blender, Web3, Blockchain, and Full Stack Development. 
            Hire the best software engineer and startup founder in Arni.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="font-mono-tech text-sm transition-all duration-300"
      style={{ 
        color: '#1FF21F',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.textShadow = '0 0 10px rgba(31, 242, 31, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.textShadow = 'none';
      }}
    >
      {label}
    </a>
  );
}
