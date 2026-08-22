import Link from "next/link";

export const metadata = { title: "Install REDEN | PRETHIM" };

export default function RedenInstallPage() {
  return (
    <main className="min-h-screen bg-[#0A0705] px-6 py-16 text-[#9C9188]">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="font-mono text-sm text-[#F5EFE6] hover:text-[#FF5A1F]">PRETHIM</Link>
        <h1 className="mt-16 text-4xl font-semibold text-[#F5EFE6]">Install REDEN</h1>
        <p className="mt-6 leading-relaxed">Sign in to your workspace to request an API key and configure your first recovery flow.</p>
        <Link href="/signin" className="mt-8 inline-flex bg-[#FF5A1F] px-6 py-3 text-sm font-semibold text-[#0A0705]">Sign in to continue</Link>
      </div>
    </main>
  );
}
