import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { publicPaths } from "@/routes/public.routes";
import { navItemGenerator } from "@/utils/navItemGenerator";
import { NavLink } from "react-router";

const Navbar = () => {
  const routes = navItemGenerator(publicPaths);
  return (
    <div className="bg-primary">
      <NavigationMenu className="w-full  text-white container mx-auto">
        <NavigationMenuList className="flex gap-x-8">
          {routes.map((route) => (
            <NavigationMenuItem key={route.name}>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "green" : "white",
                })}
                to={route.path}
              >
                {route.name}
              </NavLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
