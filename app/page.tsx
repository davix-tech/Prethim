/* eslint-disable react/no-unescaped-entities */
"use client";

/**
 * PRETHIM — brand page
 * ---------------------------------------------------------------
 * Design concept (read this before you touch it):
 *
 * PRETHIM's actual product mechanic is a state machine:
 *   EVALUATED -> ACTIONED -> COMPLETED
 * Signals come in noisy and undecided, get evaluated, and resolve
 * into a committed action. That IS the brand. So the signature
 * motion of this page is literal: a field of scattered points
 * (noise / raw signal) converges on load into a single ordered
 * mark (decision). Everything else on the page is quiet by
 * comparison on purpose — the convergence is the one bold move,
 * per "spend your boldness in one place."
 *
 * Palette (warm charcoal, not pure black; copper, not neon):
 *   bg        #14110D
 *   bg-raised #1B1712
 *   line      #2A241B
 *   bone      #ECE4D8   (primary text)
 *   sand      #8F8676   (muted text)
 *   copper    #C97C3E   (accent / ACTIONED)
 *   slate     #7C93A6   (EVALUATED)
 *   sage      #7FA382   (COMPLETED)
 *
 * Type: bold sans (font-semibold, tight negative tracking) carries
 * the brand voice on every headline — no serif. Mono (JetBrains
 * Mono, uppercase, wide tracking) carries every label, eyebrow,
 * and button — never body copy. Inter carries body copy. Add the
 * real weights via next/font/google in your layout.tsx — see the
 * import block below. Fallback stacks are wired in so this still
 * reads correctly before you do that.
 * ---------------------------------------------------------------
 */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

/*
  In your real app, replace the fallback font stacks below with:

  // app/layout.tsx
  import { Inter, JetBrains_Mono } from "next/font/google";
  const inter = Inter({ subsets: ["latin"], variable: "--font-body", weight: ["400","500","600","700"] });
  const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
  // then className={`${inter.variable} ${mono.variable}`} on <html>
*/

const FONT_BODY = `Inter, "Helvetica Neue", Arial, sans-serif`;
const FONT_MONO = `"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace`;

const EASE = [0.19, 1, 0.22, 1] as const; // expo-out — a slower, more deliberate settle than framer's defaults

// ---------------------------------------------------------------
// Signature: particle convergence canvas
// ---------------------------------------------------------------
function ConvergenceField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 140;
    type P = { x: number; y: number; tx: number; ty: number; r: number; c: string; delay: number };
    const colors = ["#C97C3E", "#7C93A6", "#7FA382", "#ECE4D8"];

    // target formation: a loose hexagonal "resolved" cluster, off-center right
    const cx = () => w * 0.68;
    const cy = () => h * 0.46;

    const points: P[] = Array.from({ length: COUNT }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * Math.max(w, h) * 0.6;
      const ring = Math.floor(i / 12);
      const a2 = (i % 12) * (Math.PI * 2 / 12) + ring * 0.35;
      const rad = 18 + ring * 20 + Math.random() * 6;
      return {
        x: cx() + Math.cos(angle) * dist,
        y: cy() + Math.sin(angle) * dist,
        tx: cx() + Math.cos(a2) * rad,
        ty: cy() + Math.sin(a2) * rad,
        r: Math.random() * 1.6 + 0.6,
        c: colors[i % colors.length],
        delay: Math.random() * 0.6,
      };
    });

    const start = performance.now();
    const DURATION = 2600;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const draw = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, w, h);

      for (const p of points) {
        let t = (elapsed - p.delay * 1000) / DURATION;
        t = Math.max(0, Math.min(1, t));
        const e = easeOutExpo(t);
        const x = p.x + (p.tx - p.x) * e;
        const y = p.y + (p.ty - p.y) * e;

        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.25 + e * 0.55;
        ctx.fill();
      }

      // faint connective lines once mostly converged
      const globalT = Math.min(1, (elapsed - 400) / DURATION);
      if (globalT > 0.55) {
        ctx.globalAlpha = (globalT - 0.55) * 0.35;
        ctx.strokeStyle = "#C97C3E";
        ctx.lineWidth = 0.5;
        for (let i = 0; i < points.length; i += 7) {
          const a = points[i];
          const b = points[(i + 5) % points.length];
          ctx.beginPath();
          ctx.moveTo(a.tx, a.ty);
          ctx.lineTo(b.tx, b.ty);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    setReady(true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}
    />
  );
}

// ---------------------------------------------------------------
// State sequence — the "Evaluated → Actioned → Completed" line,
// built as a small live readout (words + a line that actually
// draws itself) instead of a generic tracked-caps eyebrow tag.
// ---------------------------------------------------------------
function StateSequence() {
  return (
    <div className="flex items-center gap-3 mb-8" style={{ fontFamily: FONT_MONO }}>
      {STATES.map((s, i) => (
        <React.Fragment key={s.label}>
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.18, ease: EASE }}
            className="text-[13px] sm:text-sm font-medium"
            style={{ color: s.color }}
          >
            {s.label}
          </motion.span>
          {i < STATES.length - 1 && (
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35, delay: 0.3 + i * 0.18, ease: EASE }}
              className="h-px w-6 sm:w-8 bg-[#8F8676]/40 origin-left"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------
// Kinetic headline — words settle in with individual timing,
// not a uniform block fade-up
// ---------------------------------------------------------------
function KineticHeadline() {
  const line1 = ["Decisions", "are", "not"];
  const line2 = ["a", "feature."];
  const line3 = ["They're", "the", "product."];

  const renderWords = (words: string[], baseDelay: number, accent = false) =>
    words.map((word, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
        <motion.span
          initial={{ y: "115%", rotate: 3 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{
            duration: 0.9,
            delay: baseDelay + i * 0.06,
            ease: EASE,
          }}
          className={`inline-block ${accent ? "text-[#C97C3E]" : ""}`}
        >
          {word}
        </motion.span>
      </span>
    ));

  return (
    <h1
      className="text-[2.75rem] leading-[0.95] sm:text-6xl sm:leading-[0.9] md:text-8xl font-semibold tracking-[-0.04em] text-[#ECE4D8]"
    >
      <span className="block">{renderWords(line1, 0.1)}</span>
      <span className="block">{renderWords(line2, 0.32)}</span>
      <span className="block">{renderWords(line3, 0.5, true)}</span>
    </h1>
  );
}

// ---------------------------------------------------------------
// Persistent state-machine motif — a thin thread that runs down
// the page, marking the three states. Ties sections together
// instead of repeating badge pills.
// ---------------------------------------------------------------
const STATES = [
  { label: "EVALUATED", color: "#7C93A6" },
  { label: "ACTIONED", color: "#C97C3E" },
  { label: "COMPLETED", color: "#7FA382" },
];

function StateRail({ active }: { active: number }) {
  return (
    <div className="hidden md:flex flex-col items-center gap-3 fixed left-8 top-1/2 -translate-y-1/2 z-40">
      {STATES.map((s, i) => (
        <div key={s.label} className="flex flex-col items-center gap-3">
          <motion.div
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor: i <= active ? s.color : "#2A241B",
              scale: i === active ? 1.6 : 1,
            }}
            transition={{ duration: 0.5, ease: EASE }}
          />
          {i < STATES.length - 1 && (
            <div className="w-px h-10 bg-[#2A241B] relative overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: s.color }}
                animate={{ height: i < active ? "100%" : "0%" }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------
// Section wrapper with varied entrance per index (not identical
// fade-up every time)
// ---------------------------------------------------------------
function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "up" | "clip" | "scale" | "side";
  delay?: number;
  className?: string;
}) {
  const variants = {
    up: { initial: { opacity: 0, y: 36 }, animate: { opacity: 1, y: 0 } },
    clip: {
      initial: { clipPath: "inset(0 0 100% 0)", opacity: 1 },
      animate: { clipPath: "inset(0 0 0% 0)", opacity: 1 },
    },
    scale: { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 } },
    side: { initial: { opacity: 0, x: -28 }, animate: { opacity: 1, x: 0 } },
  } as const;

  const v = variants[variant];

  return (
    <motion.div
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.0, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AmbientGlow({ side = "left" as "left" | "right" }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full blur-[120px] -z-10"
      style={{ background: "#C97C3E", [side]: "-160px" } as React.CSSProperties}
      animate={{ opacity: [0.08, 0.16, 0.08], scale: [1, 1.08, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ---------------------------------------------------------------
// Main page
// ---------------------------------------------------------------
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), { stiffness: 60, damping: 20 });
  const heroOpacity = useSpring(useTransform(scrollYProgress, [0, 0.7], [1, 0]), { stiffness: 60, damping: 20 });

  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{ fontFamily: FONT_BODY }}
      className="min-h-screen bg-[#14110D] text-[#8F8676] selection:bg-[#C97C3E]/30 selection:text-[#ECE4D8] overflow-x-hidden"
    >
      <StateRail active={active} />

      {/* subtle grain, kept quiet — the canvas above does the heavy lifting */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] bg-noise" />

      <div className="max-w-[1180px] mx-auto min-h-screen flex flex-col relative z-10">
        {/* ---------- HEADER ---------- */}
        <motion.header
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="sticky top-0 z-50 py-5 sm:py-6 px-5 sm:px-6 md:pl-24 bg-[#14110D]/85 backdrop-blur-md border-b border-[#2A241B]"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              style={{ fontFamily: FONT_MONO }}
              className="flex items-center gap-2 text-sm tracking-[0.1em] uppercase text-[#ECE4D8] hover:text-[#C97C3E] transition-colors duration-300"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#C97C3E]"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              Prethim
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/signin"
                className="text-xs tracking-wide text-[#8F8676] hover:text-[#ECE4D8] transition-colors duration-300"
              >
                Sign in
              </Link>
              <Link
                href="/signin"
                className="group relative inline-flex items-center gap-2 text-[#14110D] bg-[#ECE4D8] px-4 py-2 text-[11px] font-bold uppercase tracking-wide overflow-hidden"
              >
                <span className="relative z-10">Request access</span>
                <ArrowRight className="h-3 w-3 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" />
                <span className="absolute inset-0 bg-[#C97C3E] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </motion.header>

        {/* ---------- HERO ---------- */}
        <motion.section
          ref={heroRef}
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative px-5 sm:px-6 md:pl-24 pt-20 sm:pt-28 md:pt-32 pb-24 sm:pb-32 min-h-[86vh] flex items-center"
        >
          <div className="absolute inset-0 -z-10">
            <ConvergenceField />
          </div>

          <div className="max-w-3xl">
            <StateSequence />

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -left-10 -top-10 w-72 h-72 rounded-full opacity-25 blur-[90px] pointer-events-none"
                style={{ background: "#C97C3E" }}
              />
              <KineticHeadline />
            </div>

            <Reveal variant="up" delay={0.75} className="mt-8 max-w-xl">
              <p className="text-base sm:text-lg leading-relaxed text-[#8F8676]">
                Prethim is the decision layer underneath the products you already run —
                the part that watches every signal, weighs it, and commits to an action
                before the moment passes.
              </p>
            </Reveal>

            <Reveal variant="up" delay={0.9} className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/signin"
                className="group relative inline-flex items-center gap-3 bg-[#ECE4D8] text-[#14110D] px-7 py-3.5 text-xs font-bold uppercase tracking-wide overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_32px_-4px_rgba(201,124,62,0.55)]"
              >
                <span className="relative z-10">Request access</span>
                <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-[#C97C3E] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
              </Link>
              <Link
                href="#how"
                className="inline-flex items-center gap-2 text-sm text-[#8F8676] hover:text-[#ECE4D8] transition-colors duration-300 px-2 py-3.5"
              >
                See how it decides
              </Link>
            </Reveal>
          </div>
        </motion.section>

        {/* ---------- THESIS ---------- */}
        <section className="relative px-5 sm:px-6 md:pl-24 pb-24 sm:pb-32 border-t border-[#2A241B] pt-20 sm:pt-24 overflow-hidden">
          <AmbientGlow side="right" />
          <Reveal variant="clip" className="max-w-2xl">
            <p className="text-xl sm:text-2xl leading-[1.4] text-[#ECE4D8] font-medium tracking-[-0.01em]">
              Most software waits to be told what to do. Prethim watches what's
              actually happening — a cart left behind, a session going cold, a user
              circling the same page — and decides, on its own, whether that moment is
              worth acting on.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.15} className="max-w-xl mt-8">
            <p className="text-[#8F8676] leading-relaxed">
              Not a dashboard you check. Not a report you read next week. A judgment,
              made at the moment it matters, embedded directly in the systems you
              already have.
            </p>
          </Reveal>
        </section>

        {/* ---------- HOW IT DECIDES (the real state machine, told honestly) ---------- */}
        <section id="how" className="px-5 sm:px-6 md:pl-24 pb-24 sm:pb-32 border-t border-[#2A241B] pt-20 sm:pt-24">
          <Reveal variant="up">
            <span style={{ fontFamily: FONT_MONO }} className="text-[10px] tracking-[0.25em] uppercase text-[#8F8676]">
              How it decides
            </span>
          </Reveal>

          <div className="mt-14 space-y-16">
            {[
              {
                n: "01",
                state: "EVALUATED",
                color: "#7C93A6",
                title: "Every signal gets weighed, not just logged.",
                body: "Behavior, timing, and history are scored against expected value — not a fixed rule, a live estimate of what this specific moment is worth.",
              },
              {
                n: "02",
                state: "ACTIONED",
                color: "#C97C3E",
                title: "The highest-value response fires — or nothing does.",
                body: "Doing nothing is a valid decision. Prethim only commits to an action when the expected value clears the bar, so attention isn't wasted on noise.",
              },
              {
                n: "03",
                state: "COMPLETED",
                color: "#7FA382",
                title: "The outcome feeds back in.",
                body: "What happened after the action becomes part of the next evaluation. The bar for 'worth acting on' moves as the system learns what actually works.",
              },
            ].map((step, i) => (
              <Reveal key={step.n} variant={i % 2 === 0 ? "side" : "up"} delay={i * 0.05}>
                <motion.div
                  ref={(el) => { stepRefs.current[i] = el; }}
                  whileHover="hover"
                  className="group relative grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-10 items-start border-t border-[#2A241B] pt-8 overflow-hidden"
                >
                  <motion.div
                    aria-hidden="true"
                    variants={{ hover: { opacity: 0.14, x: 6 } }}
                    initial={{ opacity: 0.06 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ color: step.color }}
                    className="pointer-events-none select-none absolute -top-6 right-0 sm:right-4 text-[7rem] sm:text-[9rem] leading-none font-semibold tracking-[-0.04em]"
                  >
                    {step.n}
                  </motion.div>

                  <div className="relative flex sm:flex-col items-center sm:items-start gap-3 sm:gap-3 sm:w-28">
                    <motion.span
                      variants={{ hover: { scale: 1.5 } }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: step.color }}
                    />
                    <span
                      style={{ fontFamily: FONT_MONO, color: step.color }}
                      className="text-[11px] font-medium tracking-wide"
                    >
                      {step.state}
                    </span>
                  </div>
                  <motion.div
                    className="relative max-w-xl"
                    variants={{ hover: { x: 4 } }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <h3 className="text-xl sm:text-2xl text-[#ECE4D8] font-semibold tracking-[-0.02em] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#8F8676] leading-relaxed">{step.body}</p>
                  </motion.div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="relative px-5 sm:px-6 md:pl-24 pb-28 sm:pb-36 border-t border-[#2A241B] pt-20 sm:pt-24 overflow-hidden">
          <AmbientGlow side="left" />
          <Reveal variant="scale" className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl text-[#ECE4D8] font-semibold tracking-[-0.03em] mb-6">
              Let the moment decide for itself.
            </h2>
            <p className="text-[#8F8676] max-w-md mb-10 leading-relaxed">
              Early access is limited while we work with the first few teams directly.
            </p>
            <Link
              href="/signin"
              className="group relative inline-flex items-center gap-3 bg-[#ECE4D8] text-[#14110D] px-7 py-3.5 text-xs font-bold uppercase tracking-wide overflow-hidden w-fit transition-shadow duration-300 hover:shadow-[0_0_32px_-4px_rgba(201,124,62,0.55)]"
            >
              <span className="relative z-10">Request access</span>
              <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-[#C97C3E] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
            </Link>
          </Reveal>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="px-5 sm:px-6 md:pl-24 py-10 border-t border-[#2A241B]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span style={{ fontFamily: FONT_MONO }} className="text-xs tracking-[0.15em] uppercase text-[#ECE4D8]">
                Prethim
              </span>
              <p className="text-xs text-[#8F8676]/70 mt-1">The decision layer.</p>
            </div>
            <nav className="flex flex-wrap items-center gap-6 text-xs text-[#8F8676]/70">
              <Link href="/docs" className="hover:text-[#ECE4D8] transition-colors">Docs</Link>
              <Link href="/privacy" className="hover:text-[#ECE4D8] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#ECE4D8] transition-colors">Terms</Link>
              <span>© 2026</span>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}