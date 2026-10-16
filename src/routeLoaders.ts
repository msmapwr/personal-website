import type { ComponentType } from "react";

type RouteLoader = () => Promise<{ default: ComponentType<any> }>;

/**
 * Shared lazy loaders let navigation warm the next page before a click.
 * The connection check avoids spending scarce bandwidth on 2G/save-data users.
 */
export const routeLoaders: Record<string, RouteLoader> = {
  home: () => import("./pages/Home").then(({ Home }) => ({ default: Home })),
  about: () => import("./pages/About").then(({ About }) => ({ default: About })),
  projects: () => import("./pages/Projects").then(({ Projects }) => ({ default: Projects })),
  skills: () => import("./pages/Skills").then(({ Skills }) => ({ default: Skills })),
  contact: () => import("./pages/Contact").then(({ Contact }) => ({ default: Contact })),
  blog: () => import("./pages/Blog").then(({ Blog }) => ({ default: Blog })),
};

const warmedRoutes = new Set<string>();

export function preloadRoute(id: string) {
  if (warmedRoutes.has(id) || typeof navigator === "undefined") return;
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  if (connection?.saveData || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") return;

  const loader = routeLoaders[id];
  if (!loader) return;
  warmedRoutes.add(id);
  void loader().catch(() => warmedRoutes.delete(id));
}
