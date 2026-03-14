import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Send,
  Copy,
  Check,
  Github,
  Linkedin,
  Mail,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Globe2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "sending" | "success" | "error";

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/mazbha-37",
    value: "mazbha-37",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mazbha-ul-haque-604615368",
    value: "mazbha-ul-haque",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:mazbhaulhaque@gmail.com",
    value: "mazbhaulhaque@gmail.com",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -32, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            end: "top 42%",
            scrub: 0.5,
          },
        },
      );
      gsap.fromTo(
        rightRef.current,
        { x: 32, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
            end: "top 38%",
            scrub: 0.5,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setStatus("error");
      setErrorMsg("Please fill in all fields");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c8de613b-ee5c-4371-9f3a-0a4752fe6a91",
          subject: `Portfolio contact from ${formData.name}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          botcheck: "", // Honeypot field for spam protection
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });

        // Reset to idle after 5 seconds so they can send another message
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      } else {
        throw new Error(data.message || "Failed to send");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Failed to send message. Please email directly or try again later.",
      );
      console.error("Form submission error:", err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("mazbhaulhaque@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-gray-primary placeholder:text-gray-secondary/40 font-mono text-sm outline-none transition-all duration-300 ${
      focused === field
        ? "border-lime/50 shadow-[0_0_0_3px_rgba(183,255,58,0.08)] bg-white/[0.06]"
        : "border-white/10 hover:border-white/20"
    } ${status === "error" && !formData[field as keyof typeof formData] ? "border-red-500/50" : ""}`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-dark py-20 lg:py-32 z-10"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-lime/[0.025] blur-3xl" />
      </div>

      <div className="relative w-full px-6 lg:px-[8vw]">
        {/* Section heading */}
        <div className="mb-14">
          <h2 className="font-heading heading-lg text-gray-primary mb-4">
            Contact
          </h2>
          <div className="accent-line mb-5" />
          <p className="body-text text-gray-secondary max-w-md">
            Open to full-stack and ML engineering roles. If you have a problem
            worth solving, let's talk.
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-start">
          {/* ── LEFT: Form card ── */}
          <div
            ref={leftRef}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 lg:p-8"
          >
            {/* Success state */}
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                <div className="w-16 h-16 rounded-full bg-lime/10 border border-lime/30 flex items-center justify-center animate-bounce">
                  <CheckCircle2 size={32} className="text-lime" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">
                    Message sent successfully!
                  </h3>
                  <p className="body-text text-gray-secondary">
                    Thanks for reaching out. I'll get back to you within 24
                    hours.
                  </p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 font-mono text-sm text-lime hover:underline transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-widest text-gray-secondary/70">
                      Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Omuk Khan"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={inputClass("name")}
                      required
                      disabled={status === "sending"}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-widest text-gray-secondary/70">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={inputClass("email")}
                      required
                      disabled={status === "sending"}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-widest text-gray-secondary/70">
                    Message *
                  </label>
                  <textarea
                    placeholder="Tell me about the role, project, or just say hi..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    className={`${inputClass("message")} resize-none leading-relaxed`}
                    required
                    disabled={status === "sending"}
                  />
                </div>

                {/* Error state */}
                {status === "error" && (
                  <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <p className="font-mono text-sm">{errorMsg}</p>
                      <p className="font-mono text-xs text-red-400/70">
                        Alternative: Email directly at{" "}
                        <a
                          href="mailto:mazbhaulhaque@gmail.com"
                          className="underline hover:text-red-300"
                        >
                          mazbhaulhaque@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit button — full width */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-lime text-dark font-heading font-bold text-sm rounded-xl transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_24px_rgba(183,255,58,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:brightness-100 active:scale-[0.98]"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send
                        size={17}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                      />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── RIGHT: Contact info card ── */}
          <div
            ref={rightRef}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 lg:p-7 flex flex-col gap-6"
          >
            {/* Available badge */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-lime">
                Available for opportunities
              </span>
            </div>

            <div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Let's build something great
              </h3>
              <p className="text-sm text-gray-secondary leading-relaxed">
                Whether it's a full-time role, freelance project, or a research
                collaboration — I'm open to interesting conversations.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.07]" />

            {/* Social links */}
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-lime/30 hover:bg-lime/[0.05] transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-white/[0.06] border border-white/[0.08] group-hover:bg-lime/[0.12] group-hover:border-lime/25 transition-all duration-300">
                    <link.icon
                      size={15}
                      className="text-gray-secondary group-hover:text-lime transition-colors duration-300"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-secondary/60 group-hover:text-lime/60 transition-colors duration-300">
                      {link.label}
                    </span>
                    <span className="font-mono text-xs text-gray-primary truncate group-hover:text-white transition-colors duration-300">
                      {link.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.07]" />

            {/* Copy email + Response time */}
            <div className="space-y-3">
              <button
                onClick={handleCopy}
                className="group w-full flex items-center justify-between gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-lime/30 hover:bg-lime/[0.05] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/[0.06] border border-white/[0.08] group-hover:bg-lime/[0.12] group-hover:border-lime/25 transition-all duration-300">
                    {copied ? (
                      <Check size={15} className="text-lime" />
                    ) : (
                      <Copy
                        size={15}
                        className="text-gray-secondary group-hover:text-lime transition-colors duration-300"
                      />
                    )}
                  </div>
                  <span className="font-mono text-xs text-gray-primary group-hover:text-white transition-colors duration-300">
                    {copied ? "Copied to clipboard!" : "Copy email address"}
                  </span>
                </div>
                <Globe2 size={14} className="text-gray-secondary/40" />
              </button>

              <div className="flex items-center gap-3 px-3 py-2.5">
                <Clock
                  size={14}
                  className="text-gray-secondary/50 flex-shrink-0"
                />
                <p className="font-mono text-[11px] text-gray-secondary/60">
                  Usually responds within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
