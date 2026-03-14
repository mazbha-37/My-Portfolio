import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  Car,
  PawPrint,
  ScanLine,
  Sparkles,
  Gamepad2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Smart Road System",
    tags: ["Python", "YOLO", "Scikit-learn"],
    description:
      "Real-time traffic analysis and accident risk prediction using object detection and classification. Implemented YOLO for vehicle detection and scikit-learn classifiers for risk assessment.",
    github: "https://github.com/mazbha-37/CSE424_Project",
    icon: Car,
    accent: "#B7FF3A",
    gradient: "from-lime/10 to-emerald-900/10",
  },
  {
    title: "Pet Shop Management System",
    tags: ["MySQL", "React.js", "Node.js", "Express.js"],
    description:
      "Relational database design with optimized queries and transaction management. Built with Django ORM for efficient data handling and SQL optimization.",
    github: "https://github.com/mazbha-37/CSE370_DataBase_Project",
    icon: PawPrint,
    accent: "#60A5FA",
    gradient: "from-blue-500/10 to-blue-900/10",
  },
  {
    title: "Mediapipe PDF Reader",
    tags: ["Python", "Mediapipe", "OpenCV"],
    description:
      "Hands-free PDF navigation using gesture recognition. Implemented computer vision pipeline for tracking hand gestures to control document scrolling and zooming.",
    github: "https://github.com/mazbha-37/Mediapipe_PDF_Reader",
    icon: ScanLine,
    accent: "#A78BFA",
    gradient: "from-purple-500/10 to-purple-900/10",
  },
  {
    title: "Craftfolio",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "shadcn/ui"],
    description:
      'A modern portfolio showcase platform built with AI-assisted "vibe coding" using Lovable. Rapidly prototyped and shipped production-ready interface with accessible components and utility-first styling.',
    github: "https://github.com/mazbha-37/craftfolio-showcase-builder",
    icon: Sparkles,
    accent: "#F472B6",
    gradient: "from-pink-500/10 to-rose-900/10",
  },
  {
    title: "BRACU Runner",
    tags: ["Python", "OpenGL", "Game Development"],
    description:
      "2D arcade-style endless runner featuring dynamic rain effects, shooting mechanics, and collision detection. Built with OpenGL for smooth 60 FPS gameplay with helicopter enemies and collectible power-ups.",
    github: "https://github.com/mazbha-37/CSE423-Project",
    icon: Gamepad2,
    accent: "#EF4444",
    gradient: "from-red-500/10 to-orange-900/10",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 0.5,
          },
        },
      );

      const cards = cardsRef.current?.querySelectorAll(".project-card");
      if (cards) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 50%",
                scrub: 0.5,
              },
            },
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-dark py-20 lg:py-32 z-10"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="font-heading heading-lg text-gray-primary mb-4">
            Selected Projects
          </h2>
          <div className="accent-line mb-6" />
          <p className="body-text text-gray-secondary max-w-xl">
            A few builds where design, performance, and logic meet.
          </p>
        </div>

        {/* Project cards — 2-column grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group flex flex-col rounded-2xl border border-white/5 bg-dark-light/20 overflow-hidden transition-all duration-500 hover:-translate-y-2"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${project.accent}35`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px ${project.accent}18, 0 0 0 1px ${project.accent}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* ── Icon header with hover FX ── */}
              <div
                className={`w-full h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center border-b border-white/5 relative overflow-hidden`}
              >
                {/* Dot grid — intensifies on hover */}
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${project.accent}66 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Radial glow blob — expands on hover */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-28 h-28 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-all duration-700 scale-50 group-hover:scale-100"
                    style={{ background: project.accent }}
                  />
                </div>

                {/* Subtle brightness overlay */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" />

                {/* Icon box */}
                <div
                  className="relative p-5 rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl"
                  style={{
                    borderColor: `${project.accent}30`,
                    background: `${project.accent}14`,
                  }}
                >
                  <project.icon
                    size={38}
                    style={{ color: project.accent }}
                    strokeWidth={1.5}
                    className="transition-transform duration-500 group-hover:-rotate-12"
                  />
                </div>

                {/* Bottom shimmer sweep */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${project.accent}cc, transparent)`,
                  }}
                />

                {/* Top shimmer — opposite direction */}
                <div
                  className="absolute top-0 right-0 h-px w-0 group-hover:w-full transition-all duration-700 ease-out delay-100"
                  style={{
                    background: `linear-gradient(270deg, transparent, ${project.accent}66, transparent)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="tech-tag group-hover:border-white/15 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-heading text-xl lg:text-2xl font-semibold text-gray-primary mb-3 group-hover:text-white transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="body-text text-gray-secondary mb-5 flex-1">
                  {project.description}
                </p>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-heading font-semibold text-sm w-fit px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105"
                  style={{
                    color: project.accent,
                    borderColor: `${project.accent}35`,
                    background: `${project.accent}10`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = `${project.accent}25`;
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 4px 16px ${project.accent}25`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = `${project.accent}10`;
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  }}
                >
                  <Github size={15} />
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
