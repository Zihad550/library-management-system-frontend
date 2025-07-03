import type { JSX, ReactNode } from "react";

export interface IUserPath {
  name?: string;
  path: string;
  Component: () => JSX.Element;
  icon?: ReactNode;
}

export interface IRoute {
  path: string;
  Component: () => JSX.Element;
}

export interface INavItem {
  name: string;
  path: string;
  icon?: ReactNode;
}
