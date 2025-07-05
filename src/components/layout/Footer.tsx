import { publicPaths } from "@/routes/public.routes";
import { navItemGenerator } from "@/utils/navItemGenerator";
import { Link } from "react-router";
import Logo from "../shared/Logo";

const Footer = () => {
  const routes = navItemGenerator(publicPaths);
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-start mb-8 md:mb-0">
            <div className="flex items-center gap-x-2 mb-4">
              <Logo />
              <span className="text-xl font-bold">LMS</span>
            </div>
            <p className="text-gray-400">
              Streamlining library management for the digital age.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              {routes.map((route) => (
                <li key={route.name} className="mb-2">
                  <Link
                    to={route.path}
                    className="hover:text-green-400 transition-colors duration-300"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">123 Library Avenue</p>
            <p className="text-gray-400">Knowledge City, KC 54321</p>
            <p className="mt-2">
              <a
                href="mailto:contact@lms.com"
                className="text-gray-400 hover:text-green-400 transition-colors duration-300"
              >
                contact@lms.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Replace with actual icons */}
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Library Management System. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
