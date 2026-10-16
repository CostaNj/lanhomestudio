"use client";

import { useEffect, useState } from "react";

/**
 * Current year. Statically prerendered pages would otherwise keep the build year,
 * so the value is refreshed in the browser after hydration.
 */
export default function CurrentYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
