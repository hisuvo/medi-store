// "use server";

import { env } from "@/env";

const API_URL = env.API_URL;

interface GetMedicinesParams {
  isActive?: Boolean;
  search?: String;
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const medicineServices = {
  getMedicine: async (
    params?: GetMedicinesParams,
    oprions?: ServiceOptions,
  ) => {
    try {
      const url = new URL(`${API_URL}/medicines`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (oprions?.cache) {
        config.cache = oprions.cache;
      }

      if (oprions?.revalidate) {
        config.next = { revalidate: oprions.revalidate };
      }

      const res = await fetch(url.toString(), config);

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
