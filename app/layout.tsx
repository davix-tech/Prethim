import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "REDEN // Adaptive Decision Infrastructure",
  description: "Continuous trajectory evaluation and real-time behavioral optimization.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#000000] text-[#f0f4ff] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
