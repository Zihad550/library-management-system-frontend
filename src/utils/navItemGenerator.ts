// import { NavLink } from "react-router";
import type { INavItem, IUserPath } from "@/types/router.type";

const generatePath = ({
  role,
  path,
  extraPath,
}: {
  role?: string;
  path?: string;
  extraPath?: string;
}) => {
  if (role && extraPath) return `/${role}/${extraPath}/${path}`;
  else if (role) return `/${role}/${path}`;
  else if (path) return `/${path}`;
  else return "/";
};

export const navItemGenerator = ({
  paths,
  role,
  extraPath,
}: {
  paths: IUserPath[];
  role?: string;
  extraPath?: string;
}) => {
  const navItems = paths.reduce<INavItem[]>((acc, cur) => {
    if (cur.name) {
      acc.push({
        name: cur.name,
        path: generatePath({ role, path: cur.path, extraPath }),
        icon: cur.icon,
      });
    }

    return acc;
  }, []);
  return navItems;
};
