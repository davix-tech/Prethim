"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Installation = {
  siteId: string;
  apiKey: string;
  name: string;
};

export default function RedenInstallPage() {
  const [storeName, setStoreName] = useState("");
  const [installation, setInstallation] = useState<Installation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [showKey, setShowKey] = useState(false);

  const createInstallation = async () => {
    if (!storeName.trim()) {
      setError("Enter a store name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/reden/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: storeName.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to create installation."
        );
      }

      setInstallation({
        siteId: data.siteId,
        apiKey: data.apiKey,
        name: storeName.trim(),
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create installation."
      );
    } finally {
      setLoading(false);
    }
  };

  const sdkCode = installation
    ? `<script
  src="https://reden.dcore.name.ng/sdk.js"
  data-site-id="${installation.siteId}"
  data-api-key="${installation.apiKey}"
></script>`
    : "";

  const copy = async (value: string, type: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(type);

    setTimeout(() => {
      setCopied("");
    }, 1800);
  };

  const maskedKey = installation
    ? `${installation.apiKey.slice(0, 7)}${"•".repeat(28)}`
    : "";

  return (
    <main className="min-h-screen bg-[#080706] text-[#d8d1ca]">
      {/* Subtle grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-8 md:px-10">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <Link
            href="/"
            className="font-mono text-sm tracking-[0.18em] text-[#f3eee8] transition-colors hover:text-[#ff5a1f]"
          >
            REDEN
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="font-mono text-xs text-[#77716b] transition-colors hover:text-[#d8d1ca]"
            >
              DASHBOARD
            </Link>

            <span className="font-mono text-[10px] tracking-widest text-[#514c47]">
              v1
            </span>
          </div>
        </header>

        {/* Page intro */}
        <section className="pt-20 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6f6861]">
              <span className="h-px w-8 bg-[#ff5a1f]" />
              Installation
            </div>

            <h1 className="max-w-3xl text-4xl font-medium tracking-[-0.035em] text-[#f3eee8] md:text-6xl">
              Connect your storefront
              <br />
              to REDEN.
            </h1>

            <p className="mt-7 max-w-2xl text-[15px] leading-7 text-[#817a73]">
              REDEN observes storefront events, evaluates purchase intent,
              and returns revenue decisions through a lightweight SDK.
            </p>
          </motion.div>
        </section>

        {/* Main installation area */}
        <section className="mt-16">
          <AnimatePresence mode="wait">
            {!installation ? (
              <motion.div
                key="create"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="border border-white/[0.09] bg-[#0d0b0a]"
              >
                <div className="border-b border-white/[0.07] px-6 py-5 md:px-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.16em] text-[#f3eee8]">
                      01 / CREATE INSTALLATION
                    </span>

                    <span className="font-mono text-[10px] text-[#4f4944]">
                      FREE TIER
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-[1fr_0.7fr]">
                  <div className="p-6 md:p-8">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#625b55]">
                      Store name
                    </label>

                    <input
                      value={storeName}
                      onChange={(e) => {
                        setStoreName(e.target.value);
                        setError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          createInstallation();
                        }
                      }}
                      placeholder="my-store.com"
                      className="mt-3 w-full border border-white/[0.1] bg-[#090807] px-4 py-4 font-mono text-sm text-[#eee8e1] outline-none transition-colors placeholder:text-[#393531] focus:border-[#ff5a1f]/60"
                    />

                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 font-mono text-xs text-[#ff6b3d]"
                      >
                        {error}
                      </motion.p>
                    )}

                    <button
                      onClick={createInstallation}
                      disabled={loading}
                      className="mt-6 inline-flex items-center gap-3 bg-[#ff5a1f] px-6 py-3.5 font-mono text-xs font-semibold tracking-wide text-[#100b08] transition-all hover:bg-[#ff6b35] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? "CREATING..." : "CREATE INSTALLATION"}
                      {!loading && <span>→</span>}
                    </button>
                  </div>

                  <div className="border-t border-white/[0.07] p-6 md:border-l md:border-t-0 md:p-8">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#625b55]">
                      What happens next
                    </div>

                    <div className="mt-6 space-y-5">
                      {[
                        "REDEN provisions a unique site identity.",
                        "Your installation receives an API credential.",
                        "You add one SDK snippet to your storefront.",
                        "REDEN begins receiving storefront events.",
                      ].map((item, index) => (
                        <div
                          key={item}
                          className="flex gap-4"
                        >
                          <span className="font-mono text-[10px] text-[#ff5a1f]">
                            0{index + 1}
                          </span>

                          <p className="text-sm leading-6 text-[#77716b]">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="installation"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                {/* Installation identity */}
                <div className="border border-white/[0.09] bg-[#0d0b0a]">
                  <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5 md:px-8">
                    <span className="font-mono text-xs tracking-[0.16em] text-[#f3eee8]">
                      INSTALLATION READY
                    </span>

                    <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#7d766f]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#72b77b]" />
                      PROVISIONED
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2">
                    <div className="border-b border-white/[0.07] p-6 md:border-r md:border-b-0 md:p-8">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#625b55]">
                        Store
                      </div>

                      <div className="mt-3 text-xl text-[#eee8e1]">
                        {installation.name}
                      </div>

                      <div className="mt-2 font-mono text-[10px] text-[#4e4843]">
                        FREE / ACTIVE
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#625b55]">
                        Site ID
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-4">
                        <code className="truncate font-mono text-sm text-[#c6bfb8]">
                          {installation.siteId}
                        </code>

                        <button
                          onClick={() =>
                            copy(installation.siteId, "site")
                          }
                          className="shrink-0 font-mono text-[10px] text-[#77716b] hover:text-[#ff5a1f]"
                        >
                          {copied === "site" ? "COPIED" : "COPY"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* API credentials */}
                <div className="border border-white/[0.09] bg-[#0d0b0a]">
                  <div className="border-b border-white/[0.07] px-6 py-5 md:px-8">
                    <span className="font-mono text-xs tracking-[0.16em] text-[#f3eee8]">
                      02 / CREDENTIALS
                    </span>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#625b55]">
                          API key
                        </div>

                        <code className="mt-3 block break-all font-mono text-sm text-[#c6bfb8]">
                          {showKey ? installation.apiKey : maskedKey}
                        </code>
                      </div>

                      <div className="ml-6 flex shrink-0 gap-4">
                        <button
                          onClick={() => setShowKey(!showKey)}
                          className="font-mono text-[10px] text-[#77716b] hover:text-[#d8d1ca]"
                        >
                          {showKey ? "HIDE" : "REVEAL"}
                        </button>

                        <button
                          onClick={() =>
                            copy(installation.apiKey, "key")
                          }
                          className="font-mono text-[10px] text-[#ff5a1f]"
                        >
                          {copied === "key" ? "COPIED" : "COPY"}
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 border-l border-[#ff5a1f]/40 pl-4">
                      <p className="font-mono text-[10px] leading-5 text-[#625b55]">
                        This credential identifies your installation.
                        Do not expose it in public repositories.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SDK */}
                <div className="border border-white/[0.09] bg-[#0d0b0a]">
                  <div className="border-b border-white/[0.07] px-6 py-5 md:px-8">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs tracking-[0.16em] text-[#f3eee8]">
                        03 / SDK
                      </span>

                      <span className="font-mono text-[10px] text-[#4f4944]">
                        JAVASCRIPT
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <p className="max-w-xl text-sm leading-6 text-[#77716b]">
                      Add this snippet to your storefront, immediately
                      before the closing <code>&lt;/body&gt;</code> tag.
                    </p>

                    <div className="relative mt-6 overflow-hidden border border-white/[0.07] bg-[#080706]">
                      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#49443f]">
                          storefront.html
                        </span>

                        <button
                          onClick={() => copy(sdkCode, "sdk")}
                          className="font-mono text-[10px] text-[#77716b] hover:text-[#ff5a1f]"
                        >
                          {copied === "sdk" ? "COPIED" : "COPY"}
                        </button>
                      </div>

                      <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 text-[#aaa29a]">
                        <code>{sdkCode}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Verification */}
                <div className="border border-white/[0.09] bg-[#0d0b0a]">
                  <div className="border-b border-white/[0.07] px-6 py-5 md:px-8">
                    <span className="font-mono text-xs tracking-[0.16em] text-[#f3eee8]">
                      04 / VERIFY
                    </span>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="space-y-4">
                      <StatusRow
                        label="API connection"
                        status="Operational"
                        active
                      />

                      <StatusRow
                        label="Installation"
                        status="Provisioned"
                        active
                      />

                      <StatusRow
                        label="First event"
                        status="Waiting for storefront"
                      />
                    </div>

                    <div className="mt-8 border-t border-white/[0.07] pt-6">
                      <p className="font-mono text-[10px] leading-5 text-[#625b55]">
                        Once the SDK sends its first event, REDEN will
                        recognize this installation automatically.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/[0.07] py-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row">
            <span className="font-mono text-[10px] tracking-[0.18em] text-[#48433e]">
              REDEN / REVENUE INFRASTRUCTURE
            </span>

            <div className="flex gap-6 font-mono text-[10px] text-[#48433e]">
              <Link
                href="/dashboard"
                className="hover:text-[#d8d1ca]"
              >
                DASHBOARD
              </Link>

              <span>API</span>

              <span>STATUS</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function StatusRow({
  label,
  status,
  active = false,
}: {
  label: string;
  status: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
      <div className="flex items-center gap-3">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            active ? "bg-[#72b77b]" : "bg-[#5c554f]"
          }`}
        />

        <span className="font-mono text-xs text-[#8b837c]">
          {label}
        </span>
      </div>

      <span
        className={`font-mono text-[10px] ${
          active ? "text-[#72b77b]" : "text-[#5c554f]"
        }`}
      >
        {status}
      </span>
    </div>
  );
}