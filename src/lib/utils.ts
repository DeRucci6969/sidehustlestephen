export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function absoluteUrl(path: string) {
  const fallbackBase = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
  const configuredBase = process.env.NEXT_PUBLIC_APP_URL ?? fallbackBase;
  let base = fallbackBase;

  try {
    base = new URL(configuredBase).origin;
  } catch {
    base = new URL(fallbackBase).origin;
  }

  const safePath = path.startsWith("/") && !path.startsWith("//") && !path.includes("://") ? path : "/";
  return `${base}${safePath}`;
}

export function safeInternalPath(value: string | null | undefined, fallback = "/packs") {
  if (!value) return fallback;
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  if (value.includes("://")) return fallback;
  return value;
}
