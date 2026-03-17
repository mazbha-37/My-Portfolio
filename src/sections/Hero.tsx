import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, ArrowDown, Eye } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Load animation — desktop only
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        portraitRef.current,
        { x: "40vw", opacity: 0, rotate: -6, scale: 0.96 },
        { x: 0, opacity: 1, rotate: -2, scale: 1, duration: 1 },
        0,
      );

      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.2,
      );

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

      tl.fromTo(
        subheadRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.6,
      );

      tl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.7,
      );

      tl.fromTo(
        socialRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.8,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation — desktop only (avoids scroll jank on mobile)
  useLayoutEffect(() => {
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set(
              [
                portraitRef.current,
                headlineRef.current,
                subheadRef.current,
                ctaRef.current,
                socialRef.current,
                labelRef.current,
              ],
              { opacity: 1, x: 0, y: 0, scale: 1 },
            );
          },
        },
      });

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: "-18vw", opacity: 0, ease: "power2.in" },
        0.7,
      );

      scrollTl.fromTo(
        portraitRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: "18vw", scale: 0.92, opacity: 0, ease: "power2.in" },
        0.7,
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: "power2.in" },
        0.75,
      );

      scrollTl.fromTo(
        subheadRef.current,
        { y: 0, opacity: 1 },
        { y: "10vh", opacity: 0, ease: "power2.in" },
        0.72,
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: "10vh", opacity: 0, ease: "power2.in" },
        0.74,
      );

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
      className="relative w-full bg-dark overflow-hidden z-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-dark-light/30 via-dark to-dark pointer-events-none" />

      {/* ══════════════════════════════════════
           MOBILE LAYOUT  (hidden on lg+)
      ══════════════════════════════════════ */}
      <div className="lg:hidden relative flex flex-col px-6 pt-24 pb-10">
        {/* Label */}
        <span className="label-text text-gray-secondary mb-4 block">
          DHAKA · CS GRAD · 2026
        </span>

        {/* Portrait — 3/4 ratio, centered at 62% width so it stays
            portrait-tall without consuming the entire screen height */}
        <div
          className="mx-auto rounded-2xl overflow-hidden mb-5 relative flex-shrink-0"
          style={{ width: "62%", aspectRatio: "3/4" }}
        >
          <img
            src="/hero_portrait.jpg"
            alt="Mazbha Ul Haque"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent" />
        </div>

        {/* Headline */}
        <div className="mb-3">
          <h1 className="font-heading text-[2rem] leading-[1.05] font-bold text-gray-primary">
            <span className="block">FULL-STACK</span>
            <span className="block">DEVELOPER</span>
            <span className="block text-lime">& ML RESEARCHER</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p className="text-sm text-gray-secondary leading-relaxed mb-5">
          CS graduate with a research edge in ML and LLMs, a system design
          enthusiast, and backend expert building intelligent systems from
          real-world data.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3 flex-wrap mb-5">
          <button
            onClick={handleScrollToProjects}
            className="group flex items-center gap-2 px-5 py-2.5 bg-lime text-dark font-heading font-semibold rounded-pill btn-hover text-sm"
          >
            View selected work
            <ArrowDown
              size={16}
              className="group-hover:translate-y-1 transition-transform"
            />
          </button>
          <a
            href="https://drive.google.com/file/d/1em8tz-VxeUfOpv7CHl2sW9aYrQ2nqNa5/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 border border-lime text-lime font-heading font-semibold rounded-pill btn-hover hover:bg-lime hover:text-dark transition-colors text-sm"
          >
            <Eye size={16} />
            View CV
          </a>
        </div>

        {/* Social row */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/mazbha-37"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-secondary hover:text-lime transition-colors"
          >
            <Github size={18} />
            <span className="font-mono text-xs uppercase tracking-wider">
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
            <span className="font-mono text-xs uppercase tracking-wider">
              LinkedIn
            </span>
          </a>
          <a
            href="mailto:mazbhaulhaque@gmail.com"
            className="flex items-center gap-2 text-gray-secondary hover:text-lime transition-colors"
          >
            <Mail size={18} />
            <span className="font-mono text-xs uppercase tracking-wider">
              Email
            </span>
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════
           DESKTOP LAYOUT  (hidden below lg)
      ══════════════════════════════════════ */}
      <div className="hidden lg:block relative w-full h-screen">
        <div className="relative w-full h-full">
          {/* Small label */}
          <span
            ref={labelRef}
            className="absolute left-[8vw] top-[12vh] label-text text-gray-secondary"
          >
            DHAKA · CS GRAD · 2026
          </span>

          {/* Headline */}
          <div
            ref={headlineRef}
            className="absolute left-[8vw] top-[18vh] w-[42vw]"
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
            className="absolute left-[8vw] top-[52vh] w-[34vw] body-text text-gray-secondary"
          >
            CS graduate with a research edge in ML and LLMs, a system design
            enthusiast, and backend expert building intelligent systems from
            real-world data.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="absolute left-[8vw] top-[68vh] flex items-center gap-4 flex-wrap"
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
              href="https://drive.google.com/file/d/1em8tz-VxeUfOpv7CHl2sW9aYrQ2nqNa5/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 border border-lime text-lime font-heading font-semibold rounded-pill btn-hover hover:bg-lime hover:text-dark transition-colors"
            >
              <Eye size={18} />
              View CV
            </a>
          </div>

          {/* Social row */}
          <div
            ref={socialRef}
            className="absolute left-[8vw] bottom-[7vh] flex items-center gap-6"
          >
            <a
              href="https://github.com/mazbha-37"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-secondary hover:text-lime transition-colors"
            >
              <Github size={18} />
              <span className="font-mono text-sm uppercase tracking-wider">
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
              <span className="font-mono text-sm uppercase tracking-wider">
                LinkedIn
              </span>
            </a>
            <a
              href="mailto:mazbhaulhaque@gmail.com"
              className="flex items-center gap-2 text-gray-secondary hover:text-lime transition-colors"
            >
              <Mail size={18} />
              <span className="font-mono text-sm uppercase tracking-wider">
                Email
              </span>
            </a>
          </div>

          {/* Portrait Card */}
          <div
            ref={portraitRef}
            className="absolute left-[56vw] top-[14vh] w-[38vw] h-[72vh] rounded-2xl overflow-hidden shadow-card"
            style={{ transform: "rotate(-2deg)" }}
          >
            <img
              src="/hero_portrait.jpg"
              alt="Mazbha Ul Haque"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
