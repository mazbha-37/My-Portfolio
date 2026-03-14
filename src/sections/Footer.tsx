import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll(".footer-item");
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              end: "top 60%",
              scrub: 0.5,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative w-full bg-dark py-20 lg:py-32 z-10"
    >
      <div className="w-full px-6">
        <div
          ref={contentRef}
          className="flex flex-col items-center text-center"
        >
          {/* Logo */}
          <a
            href="#"
            className="footer-item font-heading text-3xl lg:text-4xl font-bold text-gray-primary hover:text-lime transition-colors mb-6"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Mazbha<span className="text-lime">.</span>
          </a>

          {/* Tagline */}
          <p className="footer-item body-text text-gray-secondary mb-10">
            Thanks for stopping by.
          </p>

          {/* Social links */}
          <div className="footer-item flex items-center gap-6 mb-10">
            <a
              href="https://github.com/mazbha-37"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-dark-light border border-white/10 text-gray-secondary hover:text-lime hover:border-lime transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mazbha-ul-haque-604615368"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-dark-light border border-white/10 text-gray-secondary hover:text-lime hover:border-lime transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:mazbhaulhaque@gmail.com"
              className="p-3 rounded-full bg-dark-light border border-white/10 text-gray-secondary hover:text-lime hover:border-lime transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Copyright */}
          <p className="footer-item font-mono text-xs text-gray-secondary/60">
            © 2026 Mazbha Ul Haque. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
