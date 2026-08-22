import Link from "next/link";

export const metadata = { title: "Documentation | PRETHIM" };

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#0A0705] px-6 py-16 text-[#9C9188]">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="font-mono text-sm text-[#F5EFE6] hover:text-[#FF5A1F]">PRETHIM</Link>
        <p className="mt-16 font-mono text-xs uppercase tracking-[0.2em] text-[#FF5A1F]">Documentation</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-[#F5EFE6]">Build with adaptive decisions.</h1>
        <p className="mt-6 max-w-xl leading-relaxed">Start with REDEN, the edge-native decision API for real-time storefront behavior.</p>
        <Link href="/docs/reden" className="mt-10 inline-flex bg-[#FF5A1F] px-6 py-3 text-sm font-semibold text-[#0A0705]">Read REDEN docs</Link>
      </div>
    </main>
  );
}
