"use server";

const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const sendResetLink = async (email: string) => {
  const response = await fetch(
    `${process.env.SUPABASE_URL}/auth/v1/recover`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      },
      body: JSON.stringify({ email }),
    },
  );

  const result = await parseResponse(response);

  return { response: { ok: response.ok }, result };
};
