const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export interface RecoverySession {
  accessToken: string;
  refreshToken: string;
}

interface UpdatePasswordRequest {
  accessToken: string;
  password: string;
}

const refreshRecoverySession = async (refreshToken: string) => {
  const response = await fetch("/api/auth/recovery-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const result = await parseResponse(response);

  if (!response.ok || !result?.accessToken || !result?.refreshToken) {
    return { response: { ok: false }, session: null };
  }

  return {
    response: { ok: true },
    session: {
      accessToken: result.accessToken as string,
      refreshToken: result.refreshToken as string,
    },
  };
};

export const getValidRecoverySession = async ({
  accessToken,
  refreshToken,
}: RecoverySession) => {
  const response = await fetch("/api/auth/recovery-session", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return {
      response: { ok: true },
      session: {
        accessToken,
        refreshToken,
      },
    };
  }

  return refreshRecoverySession(refreshToken);
};

export const updatePassword = async ({
  accessToken,
  password,
}: UpdatePasswordRequest) => {
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ password }),
  });

  const result = await parseResponse(response);

  return { response: { ok: response.ok }, result };
};
