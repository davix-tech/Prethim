import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // Verify that the user is actually signed in to PRETHIM.
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          ok: false,
          error: "unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const name = String(body?.name || "").trim();
    const website = String(body?.website || "").trim();

    if (!name) {
      return NextResponse.json(
        {
          ok: false,
          error: "project_name_required",
        },
        { status: 400 }
      );
    }

    if (!website) {
      return NextResponse.json(
        {
          ok: false,
          error: "website_required",
        },
        { status: 400 }
      );
    }

    // These remain server-side secrets.
    const redenUrl = process.env.REDEN_API_URL;
    const adminSecret = process.env.REDEN_ADMIN_SECRET;

    if (!redenUrl || !adminSecret) {
      console.error(
        "[REDEN ONBOARD] Missing REDEN_API_URL or REDEN_ADMIN_SECRET"
      );

      return NextResponse.json(
        {
          ok: false,
          error: "server_configuration_error",
        },
        { status: 500 }
      );
    }

    // Server → REDEN.
    const response = await fetch(
      `${redenUrl.replace(/\/$/, "")}/api/v1/onboard`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Secret": adminSecret,
        },
        body: JSON.stringify({
          name,
          owner_email: session.user.email,
        }),
        cache: "no-store",
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error(
        "[REDEN ONBOARD] REDEN returned:",
        response.status,
        data
      );

      return NextResponse.json(
        {
          ok: false,
          error: data?.error || "reden_onboarding_failed",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      ok: true,
      siteId: data.siteId,
      apiKey: data.apiKey,
      website,
    });
  } catch (error) {
    console.error("[REDEN ONBOARD ERROR]", error);

    return NextResponse.json(
      {
        ok: false,
        error: "internal_error",
      },
      { status: 500 }
    );
  }
}