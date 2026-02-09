import { createAuthClient } from "better-auth/react";

// Use the client-visible env var on the frontend. Fall back to server-only
// `BACKEND_URL` when present (useful in SSR or dev setups).
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL,
  credentials: "include",
});
