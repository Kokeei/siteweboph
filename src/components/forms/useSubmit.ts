"use client";

import { useState } from "react";
import type { ApiResult } from "@/services/api";

/** Gère les états idle / loading / success / error d'une soumission de formulaire. */
export function useSubmit<T>() {
  const [state, setState] = useState<{ status: "idle" | "loading" | "success" | "error"; data?: T; error?: string }>({ status: "idle" });
  async function run(fn: () => Promise<ApiResult<T>>) {
    setState({ status: "loading" });
    try {
      const res = await fn();
      setState(res.ok ? { status: "success", data: res.data } : { status: "error", error: res.error });
      return res;
    } catch {
      setState({ status: "error", error: "Une erreur inattendue est survenue." });
    }
  }
  return { ...state, run, reset: () => setState({ status: "idle" }) };
}
