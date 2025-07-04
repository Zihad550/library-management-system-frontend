import App from "@/App";
import { routeGenerator } from "@/utils/routesGenerator";
import { createBrowserRouter } from "react-router";
import { publicPaths } from "./public.routes";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: routeGenerator(publicPaths),
  },
]);

export default router;
