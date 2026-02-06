import { env } from "../env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userServices = {
  getSession: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Something want wrong" } };
      }

      return { data: session, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something want wrong" } };
    }
  },
};
