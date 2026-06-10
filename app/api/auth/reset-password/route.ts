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

export async function POST(request: Request) {
  const accessToken = getBearerToken(request);

  if (!accessToken) {
    return NextResponse.json(
      { message: "Invalid or expired reset link." },
      { status: 401 },
    );
  }

  let body = null;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Failed to update password" },
      { status: 400 },
    );
  }

  if (!body?.password) {
    return NextResponse.json(
      { message: "Failed to update password" },
      { status: 400 },
    );
  }

  const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ password: body.password }),
  });

  const result = await parseResponse(response);

  return NextResponse.json(result, { status: response.status });
}
