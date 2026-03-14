import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Layout, 
  Database, 
  Brain, 
  GitBranch, 
  Microscope 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    icon: Code2,
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'C/C++', 'Java'],
  },
  {
    icon: Layout,
    title: 'Frontend',
    skills: ['React', 'Tailwind CSS', 'HTML/CSS', 'TypeScript'],
  },
  {
    icon: Database,
    title: 'Backend & DB',
    skills: ['Django', 'MySQL', 'REST APIs', 'Django ORM'],
  },
  {
    icon: Brain,
    title: 'ML & Data',
    skills: ['NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'PyTorch'],
  },
  {
    icon: GitBranch,
    title: 'DevOps & QA',
    skills: ['Git', 'GitHub', 'Manual Testing', 'Cross-platform Testing'],
  },
  {
    icon: Microscope,
    title: 'Research',
    skills: ['Data Analysis', 'Statistical Inference', 'Model Evaluation'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { x: '-8vw', opacity: 0 },
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

      // Skill cards animation
      const cards = gridRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 30%',
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
      id="skills"
      className="relative w-full bg-dark py-20 lg:py-32 z-10"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left heading block */}
          <div ref={headingRef} className="lg:w-56 flex-shrink-0">
            <h2 className="font-heading heading-lg text-gray-primary mb-4">
              Skills
            </h2>
            <div className="accent-line mb-6" />
            <p className="body-text text-gray-secondary">
              Languages, frameworks, and tools I use to ship.
            </p>
          </div>

          {/* Right skills grid */}
          <div ref={gridRef} className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {skillCategories.map((category, index) => (
                <div
                  key={index}
                  className="skill-card group p-5 rounded-2xl bg-dark-light border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-lime/30 hover:bg-dark-light/80 hover:shadow-[0_8px_36px_rgba(183,255,58,0.08)]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-lime/10 group-hover:bg-lime/20 transition-all duration-300 group-hover:scale-110">
                      <category.icon
                        size={20}
                        className="text-lime transition-transform duration-300 group-hover:-rotate-6"
                      />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-gray-primary group-hover:text-white transition-colors duration-300">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="tech-tag group-hover:border-lime/20 group-hover:text-gray-primary transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
