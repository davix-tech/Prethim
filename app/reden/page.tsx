/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock, Zap, Shield, Server, GitBranch, Mail, Bell, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "REDEN — Adaptive Commerce Orchestration",
  description:
    "REDEN helps ecommerce businesses interpret shopper behaviour, evaluate purchase intent, automate timely commerce actions and understand revenue opportunities.",
  alternates: {
    canonical: "/reden",
  },
  openGraph: {
    type: "website",
    url: "https://www.prethim.name.ng/reden",
    siteName: "PRETHIM",
    title: "REDEN — Adaptive Commerce Orchestration | PRETHIM",
    description:
      "An adaptive commerce system that turns shopper behaviour and purchase intent into timely actions and revenue intelligence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "REDEN — Adaptive Commerce Orchestration | PRETHIM",
    description:
      "Turn shopper behaviour and purchase intent into timely commerce actions with REDEN.",
  },
};

export default function RedenPage() {
  return (
    <>
      {/* HEADER - Clean, no nonsense */}
      <header className="sticky top-0 z-50 border-b border-[#1E1812] bg-[#0A0908]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0908]/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-mono text-sm font-medium tracking-[0.15em] text-[#F5F1EA] group-hover:text-[#FF5A1F] transition-colors">
              PRETHIM
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/docs" className="hidden md:inline text-sm text-[#ABA296] hover:text-[#F5F1EA] transition-colors">
              Docs
            </Link>
            <Link href="/signin" className="hidden md:inline text-sm text-[#ABA296] hover:text-[#F5F1EA] transition-colors">
              Sign in
            </Link>
            <Link 
              href="/partnership" 
              className="h-9 px-5 flex items-center text-sm font-medium rounded-sm bg-[#FF5A1F] hover:bg-[#e04e14] text-[#0A0908] transition-colors"
            >
              Become a partner
            </Link>
          </div>
        </div>
      </header>

      <main className="bg-[#0A0908] text-[#ABA296]">

        {/* HERO - Direct, no fluff */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A1F] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5A1F]"></span>
                </span>
                <span className="font-mono text-[10px] tracking-[0.15em] text-[#FF5A1F]">
                  LIVE IN PRODUCTION
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-[#F5F1EA]">
                Stop losing{" "}
                <span className="text-[#FF5A1F]">22%</span>
                {" "}of your revenue.
              </h1>

              <p className="text-base sm:text-lg text-[#ABA296] leading-relaxed max-w-md">
                Reden detects abandoned carts at the edge and triggers recovery 
                before the session expires. No analytics bloat. No delayed emails. 
                Just revenue you're leaving on the table.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/reden-install" 
                  className="h-12 px-8 flex items-center gap-2 text-sm font-semibold rounded-sm bg-[#FF5A1F] hover:bg-[#e04e14] text-[#0A0908] transition-colors"
                >
                  Install REDEN
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link 
                  href="#how-it-works" 
                  className="h-12 px-6 flex items-center text-sm font-medium rounded-sm border border-[#1E1812] hover:border-[#332619] text-[#F5F1EA] transition-colors"
                >
                  How it works
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs text-[#6E6358]">
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#FF5A1F]" />
                  No payment data stored
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#FF5A1F]" />
                  Edge-native
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#FF5A1F]" />
                  Free to start
                </span>
              </div>
            </div>

            {/* Right side - The pitch */}
            <div className="space-y-6 bg-[#110D09] border border-[#1E1812] rounded-sm p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#6E6358]">
                <span className="w-2 h-2 rounded-full bg-[#4CAF50]" />
                <span>System status: operational</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF5A1F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="h-4 w-4 text-[#FF5A1F]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#F5F1EA]">Real-time detection</h3>
                    <p className="text-xs text-[#6E6358] leading-relaxed">
                      The moment a buyer goes idle, Reden knows. No polling, no delays.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF5A1F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Server className="h-4 w-4 text-[#FF5A1F]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#F5F1EA]">Edge execution</h3>
                    <p className="text-xs text-[#6E6358] leading-relaxed">
                      Runs on your CDN. No round-trip to origin servers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF5A1F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bell className="h-4 w-4 text-[#FF5A1F]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#F5F1EA]">Instant recovery</h3>
                    <p className="text-xs text-[#6E6358] leading-relaxed">
                      Webhooks, emails, popups — triggered in milliseconds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E1812]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6E6358]">Average recovery time</span>
                  <span className="font-mono text-[#F5F1EA]">8.4ms</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-[#6E6358]">Industry average</span>
                  <span className="font-mono text-[#6E6358] line-through">~200ms</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE PROBLEM - Why you need this */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-[#1E1812]/60">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F1EA] mb-4">
              Here's the problem.
            </h2>
            <p className="text-lg text-[#ABA296] leading-relaxed">
              Every e-commerce store loses about <span className="text-[#FF5A1F] font-semibold">1 in 5</span> carts to abandonment. 
              Most recovery tools send an email <span className="text-[#6E6358]">hours later</span> — when the buyer's 
              already forgotten what they were buying.
            </p>
            <div className="mt-6 p-6 bg-[#110D09] border border-[#1E1812] rounded-sm">
              <p className="text-sm text-[#ABA296]">
                <span className="text-[#FF5A1F] font-semibold">Reden flips this:</span>{" "}
                It catches abandonment the second it happens. Before the browser tab closes. 
                Before the coffee break. Before the sale is gone.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - Simple, human */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16 border-t border-[#1E1812]/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F1EA] mb-3">
              Three steps. One outcome.
            </h2>
            <p className="text-[#ABA296]">
              No complex setup. No infrastructure changes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-[#1E1812] bg-[#110D09] rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm text-[#FF5A1F]">01</span>
                <div className="h-px flex-1 bg-[#1E1812]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F5F1EA] mb-2">Connect your store</h3>
              <p className="text-sm text-[#ABA296] leading-relaxed">
                One API key. Reden hooks into your checkout flow — no client-side tracking scripts.
              </p>
            </div>

            <div className="p-6 border border-[#1E1812] bg-[#110D09] rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm text-[#FF5A1F]">02</span>
                <div className="h-px flex-1 bg-[#1E1812]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F5F1EA] mb-2">Set your recovery rules</h3>
              <p className="text-sm text-[#ABA296] leading-relaxed">
                What happens when a cart is abandoned? Email? Webhook? Popup? You decide.
              </p>
            </div>

            <div className="p-6 border border-[#1E1812] bg-[#110D09] rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm text-[#FF5A1F]">03</span>
                <div className="h-px flex-1 bg-[#1E1812]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F5F1EA] mb-2">Recover revenue</h3>
              <p className="text-sm text-[#ABA296] leading-relaxed">
                Reden handles the rest. Detection, decision, execution — all in milliseconds.
              </p>
            </div>
          </div>
        </section>

        {/* PRICING - Honest, clear */}
        <section id="pricing" className="max-w-6xl mx-auto px-6 py-16 border-t border-[#1E1812]/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F1EA] mb-3">
              Pricing that makes sense.
            </h2>
            <p className="text-[#ABA296]">
              Start free. Pay when you're recovering revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <div className="p-8 border border-[#1E1812] bg-[#110D09] rounded-sm">
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#F5F1EA]">Free</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#F5F1EA]">$0</span>
                  <span className="text-sm text-[#6E6358]">/month</span>
                </div>
                <p className="text-xs text-[#6E6358] mt-1">No credit card required</p>
              </div>

              <ul className="space-y-3 text-sm text-[#ABA296] mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-[#FF5A1F] flex-shrink-0 mt-0.5" />
                  <span>1,000 cart recovery events per month</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-[#FF5A1F] flex-shrink-0 mt-0.5" />
                  <span>Webhook & email recovery</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-[#FF5A1F] flex-shrink-0 mt-0.5" />
                  <span>Community support</span>
                </li>
              </ul>

              <Link 
                href="/reden-install" 
                className="w-full h-11 flex items-center justify-center text-sm font-medium rounded-sm border border-[#1E1812] hover:border-[#332619] text-[#F5F1EA] transition-colors"
              >
                GET API KEY
              </Link>
            </div>

            {/* Pro */}
            <div className="p-8 border-2 border-[#FF5A1F] bg-[#110D09] rounded-sm relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF5A1F] text-[#0A0908] text-[10px] font-bold tracking-widest px-3 py-0.5 rounded-full uppercase">
                Most Popular
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#F5F1EA]">Pro</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#F5F1EA]">$25</span>
                  <span className="text-sm text-[#6E6358]">/month</span>
                </div>
                <p className="text-xs text-[#6E6358] mt-1">Cancel anytime</p>
              </div>

              <ul className="space-y-3 text-sm text-[#ABA296] mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-[#FF5A1F] flex-shrink-0 mt-0.5" />
                  <span>Unlimited cart recovery events</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-[#FF5A1F] flex-shrink-0 mt-0.5" />
                  <span>Custom recovery logic</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-[#FF5A1F] flex-shrink-0 mt-0.5" />
                  <span>Priority support & SLAs</span>
                </li>
              </ul>

              <button 
                disabled 
                className="w-full h-11 flex items-center justify-center text-sm font-medium rounded-sm bg-[#1E1812] text-[#6E6358] cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Coming soon
                </span>
              </button>
              <p className="text-center text-xs text-[#6E6358] mt-3">
                Join the waitlist for early access
              </p>
            </div>
          </div>
        </section>

        {/* FAQ - Because people have questions */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-[#1E1812]/60">
          <h2 className="text-3xl font-bold text-[#F5F1EA] mb-8 text-center">
            Quick answers.
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How is Reden different from email recovery tools?",
                a: "Email tools send recovery emails hours later. Reden detects abandonment in real-time and triggers recovery immediately — before the buyer leaves your site."
              },
              {
                q: "Do I need to install tracking scripts?",
                a: "No. Reden hooks into your existing checkout flow through a simple API. No client-side performance impact."
              },
              {
                q: "What happens if I exceed the free tier?",
                a: "You'll get a notification. Nothing breaks. You can upgrade or continue at the free tier limits."
              },
              {
                q: "Can I test it without committing?",
                a: "Yes. The free tier gives you 1,000 events per month — plenty to validate if it works for your store."
              }
            ].map((item, i) => (
              <details key={i} className="group border border-[#1E1812] rounded-sm">
                <summary className="flex items-center justify-between p-5 cursor-pointer text-[#F5F1EA] font-medium hover:text-[#FF5A1F] transition-colors list-none">
                  {item.q}
                  <ArrowRight className="h-4 w-4 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 text-sm text-[#ABA296] leading-relaxed border-t border-[#1E1812] pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA - No fluff, just action */}
        <section className="max-w-4xl mx-auto px-6 py-20 border-t border-[#1E1812]/60">
          <div className="text-center bg-[#110D09] border border-[#1E1812] rounded-sm p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F1EA] mb-4">
              Ready to stop losing revenue?
            </h2>
            <p className="text-[#ABA296] max-w-md mx-auto mb-8">
              Free tier. No credit card. No commitment.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link 
                href="/reden-install" 
                className="h-12 px-8 flex items-center gap-2 text-sm font-semibold rounded-sm bg-[#FF5A1F] hover:bg-[#e04e14] text-[#0A0908] transition-colors"
              >
                PROCEED INSTALL
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="/docs" 
                className="h-12 px-6 flex items-center text-sm font-medium rounded-sm border border-[#1E1812] hover:border-[#332619] text-[#F5F1EA] transition-colors"
              >
                Read the docs
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER - Minimal */}
      <footer className="border-t border-[#1E1812] bg-[#0A0908]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs tracking-[0.15em] text-[#F5F1EA]">
              PRETHIM
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
          </div>
          <nav className="flex items-center gap-6 text-xs text-[#6E6358]">
            <Link href="/docs" className="hover:text-[#F5F1EA] transition-colors">Docs</Link>
            <Link href="/privacy" className="hover:text-[#F5F1EA] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#F5F1EA] transition-colors">Terms</Link>
            <span className="text-[#6E6358]/50">© 2026</span>
          </nav>
        </div>
      </footer>
    </>
  );
}
