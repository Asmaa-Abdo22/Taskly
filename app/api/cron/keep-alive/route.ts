import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[cron/keep-alive] Missing Supabase environment variables");
    return NextResponse.json(
      { message: "Supabase keep-alive failed" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/projects?select=id&limit=1`,
      {
        method: "GET",
        headers: {
          apikey: supabaseKey,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      console.error(
        "[cron/keep-alive] Supabase request failed:",
        response.status,
        response.statusText,
      );
      return NextResponse.json(
        { message: "Supabase keep-alive failed" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Supabase keep-alive succeeded" },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "[cron/keep-alive] Unexpected error:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json(
      { message: "Supabase keep-alive failed" },
      { status: 500 },
    );
  }
}
