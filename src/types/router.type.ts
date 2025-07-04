import type { ReactNode } from "react";

export interface IUserPath {
  name?: string;
  path: string;
  element: ReactNode;
  icon?: ReactNode;
}

export interface IRoute {
  path: string;
  element: ReactNode;
}

export interface INavItem {
  name: string;
  path: string;
  icon?: ReactNode;
}
