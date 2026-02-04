import { env } from "@/env";

const API_URL = env.API_URL;

export const medicineServices = {
  getMedicine: async () => {
    try {
      const res = await fetch(`${API_URL}/medicines`);
      const data = await res.json();

      if (data.success) {
        return { data: data.result, error: null };
      }
      return { data: null, error: { message: "Something want wrong" } };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something want wrong" } };
    }
  },
};
