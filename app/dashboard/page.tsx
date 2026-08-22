/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useSpring, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Activity, Zap, Layers, Terminal, Cpu, Database, Network, Shuffle, GitBranch, ArrowRight, Sparkles, type LucideIcon } from "lucide-react";

const PARTNERS: { name: string; icon: LucideIcon }[] = [
  { name: "Vercel Edge", icon: Cpu },
  { name: "Stripe System", icon: Terminal },
  { name: "Supabase Engine", icon: Database },
  { name: "Cloudflare Workers", icon: Network },
  { name: "Upstash Redis", icon: Zap },
  { name: "Prisma Layer", icon: Layers },
  { name: "Fastly Mesh", icon: Shuffle },
  { name: "Next.js Core", icon: GitBranch },
];

const REDEN_CAPABILITIES: Array<{ icon: LucideIcon; title: string; desc: string }> = [
  {
    icon: Activity,
    title: "Sub-millisecond decisions",
    desc: "REDEN scores session signals — scroll depth, dwell time, return visits — and returns a decision in 0.4ms on average, before the browser's next repaint.",
  },
  {
    icon: Zap,
    title: "Edge-native execution",
    desc: "No call to an origin server. REDEN executes on the same edge network already serving your static assets — Vercel, Cloudflare, or Fastly.",
  },
  {
    icon: Layers,
    title: "Self-improving from traffic",
    desc: "Pathways are ranked by what your storefront's traffic actually does, so ordering improves on its own instead of waiting on a config change.",
  },
];

function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const [hasMoved, setHasMoved] = useState(false);
  const x = useSpring(0, { stiffness: 100, damping: 30 });
  const y = useSpring(0, { stiffness: 100, damping: 30 });
  const GLOW_SIZE = 800;

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handle = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
      x.set(e.clientX - GLOW_SIZE / 2);
      y.set(e.clientY - GLOW_SIZE / 2);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [x, y, shouldReduceMotion, hasMoved]);

  if (shouldReduceMotion || !hasMoved) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        style={{ x, y, width: GLOW_SIZE, height: GLOW_SIZE }}
        className="absolute rounded-full bg-[#FF5A1F]/[0.05] blur-[100px]"
      />
    </div>
  );
}

function AnimatedParticles() {
  const [particles] = useState(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#FF5A1F]/[0.08]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -200, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function FloatingCodeBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="absolute -right-20 top-1/4 w-96 hidden xl:block"
    >
      <div className="bg-[#0E0906] border border-white/[0.06] rounded-sm p-5 font-mono text-[11px] leading-7 text-[#6E6358] rotate-3 shadow-2xl">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F]/50" />
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F]/20" />
        </div>
        <pre>{`// REDEN decides in real-time
const result = await reden.decide({
  session: {
    id: "user_abc123",
    scrollDepth: 0.87,
    dwellTime: 12000,
  }
});

// 0.4ms later...
return result.pathway;`}</pre>
      </div>
    </motion.div>
  );
}

function StaggeredList() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-md"
    >
      <motion.li variants={item} className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-[#FF5A1F]/10 flex items-center justify-center flex-shrink-0 mt-1">
          <Zap className="h-4 w-4 text-[#FF5A1F]" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#F5EFE6]">Real-time decisions</h4>
          <p className="text-xs text-[#9C9188]">0.4ms average. Before the browser repaints.</p>
        </div>
      </motion.li>
      <motion.li variants={item} className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-[#FF5A1F]/10 flex items-center justify-center flex-shrink-0 mt-1">
          <Activity className="h-4 w-4 text-[#FF5A1F]" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#F5EFE6]">Learns from traffic</h4>
          <p className="text-xs text-[#9C9188]">No rules. No config. Just data.</p>
        </div>
      </motion.li>
      <motion.li variants={item} className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-[#FF5A1F]/10 flex items-center justify-center flex-shrink-0 mt-1">
          <Network className="h-4 w-4 text-[#FF5A1F]" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#F5EFE6]">Edge-native</h4>
          <p className="text-xs text-[#9C9188]">Vercel, Cloudflare, Fastly. Where your assets live.</p>
        </div>
      </motion.li>
    </motion.ul>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <div className="min-h-screen bg-[#0A0705] text-[#9C9188] font-sans selection:bg-[#FF5A1F]/30 selection:text-white overflow-x-hidden">
      <CursorGlow />
      <AnimatedParticles />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-[-15%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] opacity-[0.12] blur-[140px]"
        style={{ background: "radial-gradient(circle, #FF5A1F, transparent 60%)" }}
      />

      <div className="max-w-[1180px] mx-auto min-h-screen flex flex-col relative z-10">
        {/* HEADER */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 z-50 py-5 sm:py-6 px-5 sm:px-6 bg-[#0A0705]/80 backdrop-blur-md border-b border-white/[0.06]"
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="font-mono text-sm tracking-wide uppercase text-[#F5EFE6] hover:text-[#FF5A1F] transition-colors relative group">
              PRETHIM
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF5A1F] group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </Link>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                href="/partnership" 
                className="group font-mono text-xs tracking-wide uppercase text-[#F5EFE6] hover:text-[#FF5A1F] transition-colors border border-white/[0.08] px-4 py-2 rounded-sm hover:border-[#FF5A1F]/30 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Become a partner
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.span 
                  className="absolute inset-0 bg-[#FF5A1F]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                />
              </Link>
            </motion.div>
          </div>
        </motion.header>

        {/* HERO */}
        <motion.section 
          ref={heroRef}
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="px-5 sm:px-6 pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 relative"
        >
          <div className="max-w-4xl relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 px-3 py-1 rounded-full mb-6"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative flex h-2 w-2"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A1F] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5A1F]"></span>
                </motion.span>
                <span className="font-mono text-[10px] tracking-[0.15em] text-[#FF5A1F]">LIVE IN PRODUCTION</span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.75rem] leading-[0.95] sm:text-6xl sm:leading-[0.9] md:text-8xl font-semibold tracking-[-0.04em] text-[#F5EFE6] relative"
            >
              Beyond{" "}
              <span className="relative inline-block">
                <span className="relative z-10">static</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-[#FF5A1F]/20 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[#FF5A1F] inline-block"
              >
                systems.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-sm sm:text-base text-[#9C9188] leading-relaxed max-w-md mt-6"
            >
              Prethim builds adaptive APIs.{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[#F5EFE6] font-medium"
              >
                REDEN
              </motion.span>{" "}
              is our first — an edge-native engine that personalizes every session in real time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8"
            >
              <Link 
                href="/docs/reden" 
                className="group inline-flex items-center gap-3 bg-[#FF5A1F] text-[#0A0705] px-7 py-3.5 text-xs font-bold uppercase tracking-wide hover:bg-[#ff7a4d] transition-all relative overflow-hidden"
              >
                <span className="relative z-10">Read the docs</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.span>
                <motion.span 
                  className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                />
              </Link>
            </motion.div>

            {/* Floating code block */}
            <FloatingCodeBlock />
          </div>
        </motion.section>

        {/* MOVING LOGOS */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full border-y border-white/[0.07] py-7 sm:py-8 overflow-hidden mb-20 sm:mb-28"
        >
          <motion.div 
            className="flex gap-16 sm:gap-24 items-center font-mono text-sm tracking-wide uppercase text-[#9C9188]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-3 whitespace-nowrap"
                whileHover={{ scale: 1.05, color: "#F5EFE6" }}
                transition={{ duration: 0.2 }}
              >
                <p.icon className="h-3 w-3 text-[#FF5A1F]" /> {p.name}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* COMPANY BEAT */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="px-5 sm:px-6 pb-20 sm:pb-28 max-w-2xl"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <motion.div 
              className="absolute -left-4 top-0 bottom-0 w-1 bg-[#FF5A1F]/20 rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="text-lg sm:text-xl text-[#F5EFE6] leading-relaxed font-medium tracking-[-0.01em] pl-4">
              We started Prethim because most storefronts still ask a server in another region for permission before showing a customer what's next.{" "}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-[#FF5A1F]"
              >
                REDEN is the part of that problem we solved first.
              </motion.span>
            </p>
          </motion.div>
        </motion.section>

        {/* REDEN SECTION */}
        <section className="px-5 sm:px-6 pb-24 sm:pb-32 border-t border-white/[0.06] pt-16 sm:pt-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF5A1F] mb-5 inline-block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Introducing
            </motion.div>

            <div className="flex items-center gap-4 mb-6">
              <motion.div
                initial={{ rotate: -20, scale: 0.8, opacity: 0 }}
                whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <Image src="/reden-logo.png" alt="REDEN logo" width={48} height={48} className="opacity-95" />
              </motion.div>
              <motion.h2 
                className="text-5xl sm:text-7xl font-semibold tracking-[-0.03em] text-[#F5EFE6]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                REDEN
              </motion.h2>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3, type: "spring" }}
                className="flex items-center gap-1 bg-[#FF5A1F]/10 px-3 py-1 rounded-full"
              >
                <Sparkles className="h-3 w-3 text-[#FF5A1F]" />
                <span className="font-mono text-[9px] tracking-wider text-[#FF5A1F]">v1.0.0</span>
              </motion.div>
            </div>

            <motion.p 
              className="text-sm sm:text-base text-[#9C9188] max-w-lg leading-relaxed mb-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              An adaptive API that makes decisions at the edge in milliseconds. One call, one response, one decision — per session.
            </motion.p>

            <div className="max-w-2xl border border-white/[0.08] bg-[#0E0906] mb-10 relative">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
                <motion.span 
                  className="w-2.5 h-2.5 rounded-full bg-white/[0.12]"
                  whileHover={{ scale: 1.3 }}
                />
                <motion.span 
                  className="w-2.5 h-2.5 rounded-full bg-white/[0.12]"
                  whileHover={{ scale: 1.3 }}
                />
                <motion.span 
                  className="w-2.5 h-2.5 rounded-full bg-white/[0.12]"
                  whileHover={{ scale: 1.3 }}
                />
              </div>
              <motion.pre 
                className="p-5 font-mono text-xs sm:text-sm text-[#9C9188] overflow-x-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
{`curl https://api.prethim.dev/v1/reden/decide \\
  -H "Authorization: Bearer $PRETHIM_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "context": { "session_id": "abc123" } }'`}
              </motion.pre>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 sm:gap-10 max-w-3xl mb-10">
              {REDEN_CAPABILITIES.map((cap, i) => (
                <motion.div 
                  key={i} 
                  className="space-y-3 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <cap.icon className="h-4 w-4 text-[#FF5A1F]" />
                  </motion.div>
                  <h3 className="text-xs font-semibold tracking-wide uppercase text-[#F5EFE6] group-hover:text-[#FF5A1F] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-[#9C9188] leading-relaxed">{cap.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="flex flex-wrap items-center gap-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/docs/reden" className="inline-flex items-center gap-3 bg-[#FF5A1F] text-[#0A0705] px-7 py-3.5 text-xs font-bold uppercase tracking-wide hover:bg-[#ff7a4d] transition-all relative overflow-hidden group">
                <span className="relative z-10">Read the docs</span>
                <motion.span 
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.span>
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
              <Link href="/reden" className="text-xs font-mono uppercase tracking-wide text-[#9C9188] hover:text-[#F5EFE6] transition-colors relative group">
                Get an API key →
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#F5EFE6] group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-5 sm:px-6 py-16 sm:py-24 mt-auto border-t border-white/[0.06]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="font-mono text-sm tracking-wide uppercase text-[#9C9188]">PRETHIM</span>
            <nav className="flex items-center gap-6 text-xs text-[#6E6358]">
              <Link href="/docs" className="hover:text-[#F5EFE6] transition-colors relative group">
                Docs
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#F5EFE6] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/privacy" className="hover:text-[#F5EFE6] transition-colors relative group">
                Privacy
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#F5EFE6] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/terms" className="hover:text-[#F5EFE6] transition-colors relative group">
                Terms
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#F5EFE6] group-hover:w-full transition-all duration-300" />
              </Link>
            </nav>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
