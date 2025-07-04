// import { NavLink } from "react-router";
import type { INavItem, IUserPath } from "@/types/router.type";

export const navItemGenerator = (paths: IUserPath[]) => {
  const navItems = paths.reduce<INavItem[]>((acc, cur) => {
    if (cur.name) {
      acc.push({
        name: cur.name,
        path: `/${cur.path}`,
        icon: cur.icon,
      });
    }

    return acc;
  }, []);
  return navItems;
};
