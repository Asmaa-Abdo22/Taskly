import { NextResponse } from "next/server";

const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const getBearerToken = (request: Request) => {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length);
};

export async function GET(request: Request) {
  const accessToken = getBearerToken(request);

  if (!accessToken) {
    return NextResponse.json(
      { message: "Invalid or expired reset link." },
      { status: 401 },
    );
  }

  const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await parseResponse(response);

  return NextResponse.json(result, { status: response.status });
}

export async function POST(request: Request) {
  let body = null;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid or expired reset link." },
      { status: 400 },
    );
  }

  if (!body?.refreshToken) {
    return NextResponse.json(
      { message: "Invalid or expired reset link." },
      { status: 401 },
    );
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      },
      body: JSON.stringify({
        refresh_token: body.refreshToken,
      }),
    },
  );

  const result = await parseResponse(response);

  if (!response.ok || !result?.access_token || !result?.refresh_token) {
    return NextResponse.json(result, { status: response.status });
  }

  return NextResponse.json(
    {
      accessToken: result.access_token,
      refreshToken: result.refresh_token,
    },
    { status: response.status },
  );
}
