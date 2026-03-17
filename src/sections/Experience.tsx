import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, FlaskConical } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    icon: Briefcase,
    title: 'Product Testing Intern — Reclaim Protocol',
    meta: 'Jan 2026 – Feb 2026 · Remote (Sunnyvale, CA)',
    description:
      'Executed daily functional testing across iOS, Android, Windows, and Mac. Logged bugs, wrote test scenarios, and helped the team ship stable verification flows.',
  },
  {
    icon: FlaskConical,
    title: 'Research — Undergraduate Thesis',
    meta: 'BRAC University · GitHub Mining & ML',
    description:
      'Built a pipeline to mine GitHub behavior and generate skill portfolios. Focused on explainability and contributor profiling using Python and ML pipelines.',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.5,
          },
        }
      );

      // Timeline line animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );

      // Role blocks animation
      const roleBlocks = timelineRef.current?.querySelectorAll('.role-block');
      if (roleBlocks) {
        gsap.fromTo(
          roleBlocks,
          { x: '6vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'top 25%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-dark py-20 lg:py-32 lg:min-h-screen z-10"
    >
      <div className="w-full px-6 lg:px-0">
        <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-0">
          {/* Left heading */}
          <div
            ref={headingRef}
            className="lg:absolute lg:left-[8vw] lg:top-[12vh] w-full lg:w-[30vw]"
          >
            <h2 className="font-heading heading-lg text-gray-primary mb-4">
              Experience
            </h2>
            <div className="accent-line" />
          </div>

          {/* Right timeline */}
          <div
            ref={timelineRef}
            className="lg:absolute lg:left-[44vw] lg:top-[14vh] w-full lg:w-[48vw]"
          >
            <div className="relative pl-8 lg:pl-0">
              {/* Timeline line */}
              <div
                ref={lineRef}
                className="absolute left-0 top-0 w-0.5 h-full bg-white/15 origin-top"
              />

              {/* Experience items */}
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div key={index} className="role-block relative pl-8">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-2 w-3 h-3 -translate-x-1 rounded-full bg-lime" />

                    <div className="p-6 rounded-2xl bg-dark-light border border-white/5 card-hover">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-lime/10">
                          <exp.icon size={20} className="text-lime" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-gray-primary mb-1">
                            {exp.title}
                          </h3>
                          <span className="font-mono text-xs uppercase tracking-wider text-gray-secondary">
                            {exp.meta}
                          </span>
                        </div>
                      </div>
                      <p className="body-text text-gray-secondary pl-12">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
