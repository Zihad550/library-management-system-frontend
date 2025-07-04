import type { IRoute, IUserPath } from "@/types/router.type";

export const routeGenerator = (paths: IUserPath[]) => {
  const routes = paths.reduce<IRoute[]>((acc, cur) => {
    acc.push({
      path: cur.path ?? "",
      element: cur.element,
    });

    return acc;
  }, []);
  return routes;
};
