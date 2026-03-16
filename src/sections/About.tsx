import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mail, Phone, Globe2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const quickFacts = [
  { icon: MapPin, label: "LOCATION", value: "Dhaka, Bangladesh" },
  { icon: Mail, label: "EMAIL", value: "mazbhaulhaque@gmail.com" },
  { icon: Phone, label: "PHONE", value: "+880 1511698417" },
  {
    icon: Globe2,
    label: "AVAILABILITY",
    value: "Open to Remote Opportunities",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 45%",
            scrub: 0.5,
          },
        },
      );

      gsap.fromTo(
        bodyRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 38%",
            scrub: 0.5,
          },
        },
      );

      const factItems = factsRef.current?.querySelectorAll(".fact-item");
      if (factItems) {
        gsap.fromTo(
          factItems,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "top 25%",
              scrub: 0.5,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-dark py-20 lg:py-32 z-10"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        <div className="flex justify-center">
          <div ref={contentRef} className="w-full max-w-2xl">
            {/* Section heading */}
            <div ref={headingRef} className="mb-8">
              <h2 className="font-heading heading-lg text-gray-primary leading-tight mb-4">
                Crafting <span className="text-lime">Interactive</span>
                <br />& Performance Driven Solutions
              </h2>
              <div className="accent-line" />
            </div>

            {/* Bio */}
            <div ref={bodyRef} className="mb-10">
              <p className="body-text text-gray-secondary leading-relaxed">
                I bridge web engineering and machine learning to ship things
                that genuinely perform—from responsive frontends with smooth UX
                to data-driven ML pipelines. I care about code clarity, UI
                speed, and building systems that are easy to reason about at
                every layer.
              </p>
            </div>

            {/* Quick facts */}
            <div
              ref={factsRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {quickFacts.map((fact, index) => (
                <div
                  key={index}
                  className="fact-item flex items-start gap-4 p-4 rounded-xl bg-dark-light/50 border border-white/5 hover:border-lime/20 hover:bg-dark-light/70 transition-all duration-300"
                >
                  <fact.icon
                    size={18}
                    className="text-lime mt-0.5 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="label-text text-gray-secondary block mb-1">
                      {fact.label}
                    </span>
                    <span className="body-text text-gray-primary break-all">
                      {fact.value}
                    </span>
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
