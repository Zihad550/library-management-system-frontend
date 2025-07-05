import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { publicPaths } from "@/routes/public.routes";
import { navItemGenerator } from "@/utils/navItemGenerator";
import { Menu } from "lucide-react";
import { NavLink } from "react-router";
import Logo from "../shared/Logo";

const Navbar = () => {
  const routes = navItemGenerator(publicPaths);
  return (
    <div className="bg-primary text-white sticky top-0 z-50 mb-10">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Button asChild className="flex items-center gap-x-2">
          <NavLink to="/">
            <Logo />
            <span className="text-xl font-bold">LMS</span>
          </NavLink>
        </Button>

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-x-8">
              {routes.map((route) => (
                <NavigationMenuItem asChild key={route.name}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }: { isActive: boolean }) =>
                      `text-lg font-medium transition-colors hover:text-gray-300 ${
                        isActive ? "text-green-400 scale-110" : "text-white"
                      }`
                    }
                  >
                    {route.name}
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {routes.map((route) => (
                <DropdownMenuItem key={route.name} asChild>
                  <NavLink
                    to={route.path}
                    className={({ isActive }: { isActive: boolean }) =>
                      isActive ? "text-green-400 font-bold" : ""
                    }
                  >
                    {route.name}
                  </NavLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
