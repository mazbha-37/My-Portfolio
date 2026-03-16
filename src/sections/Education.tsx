import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  BookOpen,
  BookMarked,
  Download,
  FileText,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    icon: GraduationCap,
    type: "University",
    degree: "B.Sc. in Computer Science",
    institution: "BRAC University",
    period: "January 2022 – December 2025",
    gpa: "CGPA 3.75 / 4.00",
    accent: "#B7FF3A",
    transcriptUrl: "dist/assets/Undergrad_Transcript (1).pdf", // Place your PDF in public/transcripts/
  },
  {
    icon: BookOpen,
    type: "College",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Government Tolaram College",
    period: "2018 – 2022",
    gpa: "GPA 5.00 / 5.00",
    accent: "#60A5FA",
  },
  {
    icon: BookMarked,
    type: "School",
    degree: "Secondary School Certificate (SSC)",
    institution: "Narayanganj Ideal School",
    period: "2007 – 2018",
    gpa: "GPA 5.00 / 5.00",
    accent: "#A78BFA",
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: -24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 52%",
            scrub: 0.5,
          },
        },
      );

      const items = timelineRef.current?.querySelectorAll(".edu-item");
      if (items) {
        items.forEach((item, i) => {
          const isLeft = i % 2 === 0;
          gsap.fromTo(
            item,
            { x: isLeft ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                end: "top 55%",
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
      id="education"
      className="relative w-full bg-dark py-20 lg:py-32 z-10"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        {/* Heading — centred */}
        <div ref={headingRef} className="mb-16 text-center">
          <h2 className="font-heading heading-lg text-gray-primary mb-4">
            Education
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Vertical center line — desktop */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
          {/* Vertical left line — mobile */}
          <div className="lg:hidden absolute left-5 top-2 bottom-2 w-px bg-white/10" />

          <div className="space-y-8 lg:space-y-10">
            {education.map((item, index) => {
              const isLeft = index % 2 === 0;

              const dot = (
                <div
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 flex items-center justify-center bg-dark flex-shrink-0 relative z-10 transition-all duration-300"
                  style={{
                    borderColor: item.accent,
                    boxShadow: `0 0 18px ${item.accent}30`,
                  }}
                >
                  <item.icon
                    size={16}
                    style={{ color: item.accent }}
                    className="lg:w-5 lg:h-5"
                  />
                </div>
              );

              const card = (
                <div
                  className="group p-5 lg:p-6 rounded-2xl border border-white/5 bg-dark-light/40 hover:bg-dark-light/70 transition-all duration-400 hover:-translate-y-1 w-full"
                  style={{ boxShadow: `0 0 0 1px ${item.accent}10` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      `${item.accent}35`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      `0 0 0 1px ${item.accent}25, 0 8px 32px ${item.accent}12`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      `0 0 0 1px ${item.accent}10`;
                  }}
                >
                  <span
                    className="label-text text-xs font-mono uppercase tracking-widest mb-2 block"
                    style={{ color: item.accent }}
                  >
                    {item.type}
                  </span>
                  <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-primary mb-1 group-hover:text-white transition-colors duration-300">
                    {item.degree}
                  </h3>
                  <p className="body-text text-gray-secondary mb-4">
                    {item.institution}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-gray-secondary/70 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      {item.period}
                    </span>
                    <span
                      className="font-mono text-xs px-3 py-1 rounded-full border font-semibold"
                      style={{
                        color: item.accent,
                        borderColor: `${item.accent}35`,
                        background: `${item.accent}12`,
                      }}
                    >
                      {item.gpa}
                    </span>
                  </div>

                  {/* Download Transcript Button */}
                  {item.transcriptUrl && (
                    <div className="pt-3 border-t border-white/5">
                      <a
                        href={item.transcriptUrl}
                        download
                        className="group/link inline-flex items-center gap-2.5 font-mono text-xs transition-all duration-300 hover:opacity-80"
                        style={{ color: item.accent }}
                      >
                        <div
                          className="p-1.5 rounded-md transition-colors duration-300"
                          style={{ backgroundColor: `${item.accent}15` }}
                        >
                          <FileText size={12} />
                        </div>
                        <span className="border-b border-transparent group-hover/link:border-current transition-all">
                          Download Transcript
                        </span>
                        <Download
                          size={12}
                          className="transition-transform duration-300 group-hover/link:translate-y-0.5"
                        />
                      </a>
                      <span className="block text-[10px] text-gray-secondary/40 mt-1.5 font-mono ml-6">
                        PDF • Official Academic Record
                      </span>
                    </div>
                  )}
                </div>
              );

              return (
                <div key={index} className="edu-item relative">
                  {/* ── Mobile: left-side single column ── */}
                  <div className="flex gap-5 items-start lg:hidden">
                    {dot}
                    <div className="flex-1 pt-0.5">{card}</div>
                  </div>

                  {/* ── Desktop: alternating left / right ── */}
                  <div className="hidden lg:flex items-center">
                    {/* Left slot */}
                    <div className="flex-1 flex justify-end pr-10">
                      {isLeft ? (
                        <div className="w-full max-w-sm">{card}</div>
                      ) : null}
                    </div>
                    {/* Centre dot */}
                    {dot}
                    {/* Right slot */}
                    <div className="flex-1 pl-10">
                      {!isLeft ? (
                        <div className="w-full max-w-sm">{card}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
