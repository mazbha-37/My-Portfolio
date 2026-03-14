import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
];

const contactLink = { label: 'Contact', href: '#contact' };

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-dark/85 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="font-heading text-xl lg:text-2xl font-bold text-gray-primary hover:text-lime transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Mazbha<span className="text-lime">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="relative font-mono text-xs uppercase tracking-widest text-gray-secondary hover:text-gray-primary transition-colors duration-300 group py-1"
                >
                  {link.label}
                  {/* Sliding underline */}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-lime group-hover:w-full transition-all duration-300 ease-out" />
                </a>
              ))}

              {/* Contact — distinct pill CTA */}
              <a
                href={contactLink.href}
                onClick={(e) => handleLinkClick(e, contactLink.href)}
                className="relative font-mono text-xs uppercase tracking-widest px-5 py-2 rounded-full border border-lime/50 text-lime overflow-hidden group transition-colors duration-300 hover:text-dark"
              >
                {/* Fill sweep on hover */}
                <span className="absolute inset-0 bg-lime translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full" />
                <span className="relative">{contactLink.label}</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-dark/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="absolute top-20 left-0 right-0 p-6">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-heading text-2xl font-semibold text-gray-primary hover:text-lime transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            {/* Contact highlighted in mobile */}
            <a
              href={contactLink.href}
              onClick={(e) => handleLinkClick(e, contactLink.href)}
              className="font-heading text-2xl font-semibold text-lime"
            >
              {contactLink.label}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
