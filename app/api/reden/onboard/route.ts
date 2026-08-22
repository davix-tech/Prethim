import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const REDEN_API_URL = "https://reden.dcore.name.ng";

export async function POST(req: Request) {
  try {
    // 1. Verify the PRETHIM user is authenticated
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { ok: false, error: "unauthorized" },
        { status: 401 }
      );
    }

    // 2. Read installation details
    const body = await req.json();

    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    if (!name) {
      return NextResponse.json(
        { ok: false, error: "site_name_required" },
        { status: 400 }
      );
    }

    // 3. ADMIN_SECRET NEVER reaches the browser.
    const adminSecret = process.env.REDEN_ADMIN_SECRET;

    if (!adminSecret) {
      console.error("[REDEN ONBOARD] REDEN_ADMIN_SECRET is missing");

      return NextResponse.json(
        { ok: false, error: "server_configuration_error" },
        { status: 500 }
      );
    }

    // 4. Server → REDEN
    const response = await fetch(`${REDEN_API_URL}/api/v1/onboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": adminSecret,
      },
      body: JSON.stringify({
        name,
        owner_email: session.user.email,
      }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[REDEN ONBOARD] REDEN rejected request:", data);

      return NextResponse.json(
        {
          ok: false,
          error: data?.error || "reden_onboarding_failed",
        },
        { status: response.status }
      );
    }

    // 5. Return only what the authenticated user needs
    return NextResponse.json({
      ok: true,
      siteId: data.siteId,
      apiKey: data.apiKey,
    });
  } catch (error) {
    console.error("[REDEN ONBOARD] Unexpected error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "internal_error",
      },
      { status: 500 }
    );
  }
}