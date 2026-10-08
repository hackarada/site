import { useEffect, useState } from "react";

export type AppLocation = {
  path: string;
  hash: string;
};

function basePrefix(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

export function appPathname(): string {
  const base = basePrefix();
  let path = window.location.pathname;
  if (base && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return path || "/";
}

export function appHref(to: string): string {
  const base = basePrefix();
  const hashIndex = to.indexOf("#");
  const pathname = hashIndex === -1 ? to : to.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : to.slice(hashIndex);
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (normalized === "/") {
    return `${base}/${hash}`;
  }
  return `${base}${normalized}${hash}`;
}

export function readLocation(): AppLocation {
  const hash = window.location.hash.replace(/^#/, "");
  try {
    return { path: appPathname(), hash: hash ? decodeURIComponent(hash) : "" };
  } catch {
    return { path: appPathname(), hash };
  }
}

export function noteSlugFromPath(path: string): string | null {
  const prefix = "/notes/";
  if (!path.startsWith(prefix)) {
    return null;
  }
  const slug = path.slice(prefix.length);
  if (!slug || slug.includes("/")) {
    return null;
  }
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function isModifiedClick(event: {
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  button: number;
}): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function sameLocation(left: AppLocation, right: AppLocation): boolean {
  return left.path === right.path && left.hash === right.hash;
}

export function useRoute() {
  const [location, setLocation] = useState(readLocation);

  useEffect(() => {
    const onPop = () => {
      setLocation(readLocation());
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const go = (to: string) => {
    const href = appHref(to);
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (href !== current) {
      window.history.pushState({}, "", href);
    }
    setLocation((prev) => {
      const next = readLocation();
      return sameLocation(prev, next) ? prev : next;
    });
  };

  return { path: location.path, hash: location.hash, go };
}
