import { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';

const menuItems = [
  { label: 'The Glow Up', id: 'hero' },
  { label: 'Transformation', id: 'transformation' },
  { label: 'Journey', id: 'journey' },
  { label: 'Rituals', id: 'rituals' },
  { label: 'Investment', id: 'investment' },
  { label: 'Results', id: 'results' },
  { label: 'Begin', id: 'begin' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling past hero
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsVisible(scrollY > heroHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isVisible 
            ? 'bg-clara-black/90 backdrop-blur-md py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="flex items-center justify-between px-[8vw]">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="font-display text-lg text-clara-white hover:text-clara-gold transition-colors"
          >
            Clara's Glow Up
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-clara-white hover:text-clara-gold transition-colors flex items-center gap-2"
          >
            <span className="text-sm font-medium tracking-wider uppercase">Menu</span>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[200] bg-clara-black transition-all duration-500 ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-[8vw] py-6">
            <span className="font-display text-lg text-clara-white">
              Clara's Glow Up
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-clara-white hover:text-clara-gold transition-colors flex items-center gap-2"
            >
              <span className="text-sm font-medium tracking-wider uppercase">Close</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 flex flex-col justify-center px-[8vw]">
            <ul className="space-y-4">
              {menuItems.map((item, index) => (
                <li 
                  key={item.id}
                  className={`transform transition-all duration-500 ${
                    isOpen 
                      ? 'translate-x-0 opacity-100' 
                      : '-translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="font-display text-4xl lg:text-5xl text-clara-white hover:text-clara-gold transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-[8vw] py-6 flex items-center justify-between">
            <a 
              href="mailto:hello@clarasglowup.com"
              className="text-sm text-clara-muted hover:text-clara-gold transition-colors"
            >
              hello@clarasglowup.com
            </a>
            <a 
              href="https://instagram.com/claras.glowup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-clara-muted hover:text-clara-gold transition-colors"
            >
              @claras.glowup
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
