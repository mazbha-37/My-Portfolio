import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  FileText,
  Github,
  CheckCircle2,
  Network,
  Cpu,
  GitBranch,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  "Built an ML pipeline mining 7,378 GitHub profiles, commits, PRs, and reviews to map behavior to skills",
  "Implemented multi-task framework: Project Ranking, Technical Skills Classification, and Behavioral Pattern Detection",
  "Fine-tuned Mistral 7B LLM with LoRA to generate human-like portfolio descriptions from structured data",
  "Achieved R² = 0.97 for project ranking and F1 = 0.91 for behavioral classification using XGBoost",
  "Validated with industry professionals showing 79.2% satisfaction and 100% agreement on holistic profiling",
];

const stats = [
  { value: "7,378+", label: "Developers", sub: "Dataset" },
  { value: "69+", label: "Features", sub: "Engineered" },
  { value: "3", label: "ML Models", sub: "Framework" },
];

export default function Thesis() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top 78%",
        end: "top 42%",
        scrub: 0.5,
      };

      gsap.fromTo(
        badgeRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: trigger,
        },
      );

      gsap.fromTo(
        titleRef.current,
        { x: -28, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { ...trigger, start: "top 76%", end: "top 40%" },
        },
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { ...trigger, start: "top 74%", end: "top 38%" },
        },
      );

      const bulletItems = bulletsRef.current?.querySelectorAll(".bullet-item");
      if (bulletItems) {
        gsap.fromTo(
          bulletItems,
          { x: -22, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bulletsRef.current,
              start: "top 82%",
              end: "top 48%",
              scrub: 0.5,
            },
          },
        );
      }

      gsap.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 88%",
            end: "top 60%",
            scrub: 0.5,
          },
        },
      );

      gsap.fromTo(
        cardRef.current,
        { x: 44, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            end: "top 36%",
            scrub: 0.5,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="research"
      className="relative w-full bg-dark py-20 lg:py-32 z-10"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-lime/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-lime/[0.02] blur-3xl" />
      </div>

      <div className="relative w-full px-6 lg:px-[8vw]">
        <div className="flex flex-col lg:grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
          {/* ════════════════════════════
               LEFT COLUMN
          ════════════════════════════ */}
          <div className="flex flex-col">
            {/* Badge */}
            <div ref={badgeRef} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lime/40 bg-lime/[0.08] text-lime font-mono text-[11px] uppercase tracking-widest">
                <GraduationCap size={12} strokeWidth={2.5} />
                Undergraduate Thesis
              </span>
            </div>

            {/* Title */}
            <div ref={titleRef} className="mb-3">
              <h2 className="font-heading text-3xl lg:text-[2.6rem] font-bold text-white leading-tight tracking-tight">
                Generating Developer Portfolio based on{" "}
                <span className="text-lime">Coding Behaviour</span> using GitHub
                Mining and <span className="text-lime">Machine Learning</span>
              </h2>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="font-mono text-sm text-gray-secondary/80 mb-9 tracking-wide"
            >
              with Multi-Task Prediction Framework and LLM Fine-Tuning
            </p>

            {/* Bullet points */}
            <div ref={bulletsRef} className="space-y-3.5 mb-10">
              {bullets.map((text, i) => (
                <div
                  key={i}
                  className="bullet-item group flex items-start gap-3"
                >
                  <CheckCircle2
                    size={16}
                    className="text-lime flex-shrink-0 mt-[3px] group-hover:scale-110 transition-transform duration-200"
                    strokeWidth={2.5}
                  />
                  <p className="text-sm text-gray-secondary leading-relaxed group-hover:text-gray-primary transition-colors duration-200">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3">
              <a
                href="dist/assets/T2430470_Final_PrintCopy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3 bg-lime text-dark font-heading font-bold text-sm rounded-full transition-all duration-300 hover:scale-[1.03] hover:brightness-110 hover:shadow-[0_0_28px_rgba(183,255,58,0.45)]"
              >
                <FileText size={16} strokeWidth={2.5} />
                View Thesis PDF
              </a>
              <a
                href="https://github.com/mazbha-37/Portfolio-Generation-with-ML-and-LLM"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3 border border-white/20 text-gray-primary font-heading font-semibold text-sm rounded-full transition-all duration-300 hover:border-white/45 hover:text-white hover:-translate-y-px hover:bg-white/[0.04]"
              >
                <Github size={16} />
                View Code
              </a>
            </div>
          </div>

          {/* ════════════════════════════
               RIGHT COLUMN — glass card
          ════════════════════════════ */}
          <div
            ref={cardRef}
            className="group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 lg:p-8 flex flex-col gap-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.18] hover:shadow-[0_20px_80px_rgba(183,255,58,0.07)]"
          >
            {/* Corner ambient glows */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-3xl bg-lime/[0.05] blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-28 h-28 rounded-3xl bg-lime/[0.03] blur-2xl pointer-events-none" />

            {/* ── Icon visual — network orb ── */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="relative">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle, #B7FF3A, transparent 70%)",
                  }}
                />

                {/* Outer orbit ring */}
                <div className="relative w-28 h-28 rounded-full border border-lime/15 flex items-center justify-center">
                  {/* Inner ring */}
                  <div className="w-[4.5rem] h-[4.5rem] rounded-full border border-lime/30 bg-lime/[0.08] flex items-center justify-center transition-all duration-500 group-hover:bg-lime/[0.14] group-hover:border-lime/50">
                    <Network
                      size={28}
                      className="text-lime transition-transform duration-500 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Orbit dots */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-lime/60" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-lime/40" />
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-lime/50" />
                  <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-lime/30" />
                </div>

                {/* Satellite icon chips */}
                <div className="absolute -top-3 -right-4 p-1.5 rounded-lg bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                  <Github size={13} className="text-gray-secondary" />
                </div>
                <div className="absolute -bottom-3 -left-4 p-1.5 rounded-lg bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                  <Cpu size={13} className="text-gray-secondary" />
                </div>
                <div className="absolute -bottom-2 -right-5 p-1.5 rounded-lg bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                  <GitBranch size={13} className="text-gray-secondary" />
                </div>
                <div className="absolute -top-2 -left-5 p-1.5 rounded-lg bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                  <Users size={13} className="text-gray-secondary" />
                </div>
              </div>
            </div>

            {/* Card title & description */}
            <div className="text-center px-2">
              <h3 className="font-heading text-xl font-bold text-white mb-2 tracking-tight">
                Automated Portfolio Generation
              </h3>
              <p className="text-sm text-gray-secondary leading-relaxed">
                Developer profiling using behavioral modeling and repository
                mining across GitHub activity patterns
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.07]" />

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center p-3 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-lime/30 hover:bg-lime/[0.05] transition-all duration-300 group/stat"
                >
                  <span className="font-heading text-xl font-bold text-lime leading-none mb-1.5 group-hover/stat:scale-105 transition-transform duration-300">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[9.5px] uppercase tracking-widest text-white/70 text-center leading-tight">
                    {stat.label}
                  </span>
                  <span className="font-mono text-[8.5px] uppercase tracking-widest text-gray-secondary/50 text-center mt-0.5">
                    {stat.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
