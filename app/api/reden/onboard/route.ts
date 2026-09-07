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

    // 5. REDEN nests the created/existing site under `site`, e.g.
    //    { success: true, existing: false, site: { site_id, api_key, ... } }
    //    Reading data.siteId / data.apiKey directly (the old bug)
    //    silently produces undefined here, which the frontend then
    //    stores and later sends to /api/v1/verify -- which correctly
    //    rejects an empty site_id as invalid. Guard against that
    //    shape mismatch explicitly so a REDEN-side change loudly
    //    fails here instead of silently propagating undefined.
    const siteId = data?.site?.site_id;
    const apiKey = data?.site?.api_key;

    if (!siteId || !apiKey) {
      console.error(
        "[REDEN ONBOARD] Malformed REDEN response:",
        data
      );

      return NextResponse.json(
        { ok: false, error: "reden_returned_invalid_site_id" },
        { status: 502 }
      );
    }

    // 6. Return only what the authenticated user needs
    return NextResponse.json({
      ok: true,
      siteId,
      apiKey,
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
