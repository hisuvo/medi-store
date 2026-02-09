import { env } from "@/env";

const API_URL = env.API_URL;

export const medicineServices = {
  getMedicine: async () => {
    try {
      const res = await fetch(`${API_URL}/medicines`, {
        next: { revalidate: 10 },
      });

      if (!res.ok) {
        return { data: [], error: { message: `API returned ${res.status}` } };
      }

      const data = await res.json();

      if (data.success) {
        return { data: data.result || [], error: null };
      }
      return { data: [], error: { message: "Something went wrong" } };
    } catch (error) {
      console.log("Medicine fetch error:", error);
      return { data: [], error: { message: "Failed to fetch medicines" } };
    }
  },
};
