"use client";

import { useEffect, useState } from "react";

/** True once the client has mounted — gate persisted-store reads on this to avoid SSR hydration mismatches. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
