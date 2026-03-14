import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, ArrowDown, Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Load animation (on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Portrait card entrance
      tl.fromTo(
        portraitRef.current,
        { x: "40vw", opacity: 0, rotate: -6, scale: 0.96 },
        { x: 0, opacity: 1, rotate: -2, scale: 1, duration: 1 },
        0,
      );

      // Label entrance
      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.2,
      );

      // Headline lines entrance
      const headlineLines =
        headlineRef.current?.querySelectorAll(".headline-line");
      if (headlineLines) {
        tl.fromTo(
          headlineLines,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.06 },
          0.3,
        );
      }

      // Subheadline entrance
      tl.fromTo(
        subheadRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.6,
      );

      // CTA entrance
      tl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.7,
      );

      // Social row entrance
      tl.fromTo(
        socialRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.8,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set(
              [
                portraitRef.current,
                headlineRef.current,
                subheadRef.current,
                ctaRef.current,
                socialRef.current,
                labelRef.current,
              ],
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              },
            );
          },
        },
      });

      // Phase 3: EXIT (70% - 100%)
      // Headline exit
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: "-18vw", opacity: 0, ease: "power2.in" },
        0.7,
      );

      // Portrait exit
      scrollTl.fromTo(
        portraitRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: "18vw", scale: 0.92, opacity: 0, ease: "power2.in" },
        0.7,
      );

      // Label exit
      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: "power2.in" },
        0.75,
      );

      // Subheadline exit
      scrollTl.fromTo(
        subheadRef.current,
        { y: 0, opacity: 1 },
        { y: "10vh", opacity: 0, ease: "power2.in" },
        0.72,
      );

      // CTA exit
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: "10vh", opacity: 0, ease: "power2.in" },
        0.74,
      );

      // Social exit
      scrollTl.fromTo(
        socialRef.current,
        { y: 0, opacity: 1 },
        { y: "10vh", opacity: 0, ease: "power2.in" },
        0.76,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = () => {
    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-dark overflow-hidden z-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-dark-light/30 via-dark to-dark" />

      <div className="relative w-full h-full px-6 lg:px-0">
        {/* Small label */}
        <span
          ref={labelRef}
          className="absolute left-6 lg:left-[8vw] top-[12vh] label-text text-gray-secondary"
        >
          DHAKA · CS GRAD · 2025
        </span>

        {/* Headline */}
        <div
          ref={headlineRef}
          className="absolute left-6 lg:left-[8vw] top-[18vh] w-[90vw] lg:w-[42vw]"
        >
          <h1 className="font-heading heading-xl text-gray-primary">
            <span className="headline-line block">FULL-STACK</span>
            <span className="headline-line block">DEVELOPER</span>
            <span className="headline-line block text-lime">
              & ML RESEARCHER
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="absolute left-6 lg:left-[8vw] top-[48vh] lg:top-[52vh] w-[90vw] lg:w-[34vw] body-text text-gray-secondary"
        >
          I build responsive web systems and apply machine learning to
          real-world problems—most recently, generating developer portfolios
          from GitHub behavior.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="absolute left-6 lg:left-[8vw] top-[62vh] lg:top-[68vh] flex items-center gap-4 flex-wrap"
        >
          <button
            onClick={handleScrollToProjects}
            className="group flex items-center gap-3 px-6 py-3 bg-lime text-dark font-heading font-semibold rounded-pill btn-hover"
          >
            View selected work
            <ArrowDown
              size={18}
              className="group-hover:translate-y-1 transition-transform"
            />
          </button>
          <a
            href="/dist/Mazbha Ul Haque.pdf"
            download
            className="group flex items-center gap-3 px-6 py-3 border border-lime text-lime font-heading font-semibold rounded-pill btn-hover hover:bg-lime hover:text-dark transition-colors"
          >
            <Download size={18} />
            Download CV
          </a>
        </div>

        {/* Social row */}
        <div
          ref={socialRef}
          className="absolute left-6 lg:left-[8vw] bottom-[7vh] flex items-center gap-6"
        >
          <a
            href="https://github.com/mazbha-37"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-secondary hover:text-lime transition-colors"
          >
            <Github size={18} />
            <span className="font-mono text-sm uppercase tracking-wider hidden sm:inline">
              GitHub
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/mazbha-ul-haque-604615368"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-secondary hover:text-lime transition-colors"
          >
            <Linkedin size={18} />
            <span className="font-mono text-sm uppercase tracking-wider hidden sm:inline">
              LinkedIn
            </span>
          </a>
          <a
            href="mailto:mazbhaulhaque@gmail.com"
            className="flex items-center gap-2 text-gray-secondary hover:text-lime transition-colors"
          >
            <Mail size={18} />
            <span className="font-mono text-sm uppercase tracking-wider hidden sm:inline">
              Email
            </span>
          </a>
        </div>

        {/* Portrait Card */}
        <div
          ref={portraitRef}
          className="hidden lg:block absolute left-[56vw] top-[14vh] w-[38vw] h-[72vh] rounded-2xl overflow-hidden shadow-card"
          style={{ transform: "rotate(-2deg)" }}
        >
          <img
            src="/dist/hero_portrait.jpg"
            alt="Mazbha Ul Haque"
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
        </div>

        {/* Mobile portrait */}
        <div className="lg:hidden absolute right-6 top-[18vh] w-24 h-32 rounded-xl overflow-hidden">
          <img
            src="/dist/hero_portrait.jpg"
            alt="Mazbha Ul Haque"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
