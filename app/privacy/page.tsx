import Link from "next/link";

export const metadata = { title: "Privacy | PRETHIM" };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A0705] px-6 py-16 text-[#9C9188]">
      <article className="mx-auto max-w-2xl leading-relaxed">
        <Link href="/" className="font-mono text-sm text-[#F5EFE6] hover:text-[#FF5A1F]">PRETHIM</Link>
        <h1 className="mt-16 text-4xl font-semibold text-[#F5EFE6]">Privacy</h1>
        <p className="mt-6">PRETHIM collects only the information needed to provide and secure its services. We do not sell personal information.</p>
        <p className="mt-4">Authentication data is handled by our configured identity providers. Contact support for data access or deletion requests.</p>
      </article>
    </main>
  );
}
