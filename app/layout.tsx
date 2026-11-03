import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

const siteUrl = "https://www.prethim.name.ng";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PRETHIM | Adaptive Decision Infrastructure",
    template: "%s | PRETHIM",
  },
  description:
    "PRETHIM builds adaptive decision infrastructure: software that turns real-time signals and business context into intelligent, automated actions. Meet REDEN, our commerce decision product.",
  applicationName: "PRETHIM",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "PRETHIM",
    title: "PRETHIM | Adaptive Decision Infrastructure",
    description:
      "Adaptive decision infrastructure that turns real-time signals and business context into intelligent, automated actions.",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRETHIM | Adaptive Decision Infrastructure",
    description:
      "Adaptive decision infrastructure that turns real-time signals and business context into intelligent, automated actions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#000000] text-[#f0f4ff] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PRETHIM",
              url: siteUrl,
              description:
                "PRETHIM builds adaptive decision infrastructure that turns real-time signals and business context into intelligent, automated actions.",
              brand: {
                "@type": "Brand",
                name: "PRETHIM",
              },
              knowsAbout: [
                "Adaptive decision infrastructure",
                "Commerce orchestration",
                "Behavioural intelligence",
                "Software APIs",
              ],
            }),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
