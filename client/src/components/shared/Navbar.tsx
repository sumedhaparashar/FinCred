import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">F</span>
              </div>
              <span className="ml-2 text-xl font-heading font-bold text-gray-900 dark:text-white">
                Fincread
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`border-transparent hover:text-primary-500 dark:hover:text-primary-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150 ${
                  location === "/"
                    ? "border-primary-500 text-primary-500 dark:text-primary-400 dark:border-primary-400 font-medium"
                    : "text-gray-500 dark:text-gray-300"
                }`}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className={`border-transparent hover:text-primary-500 dark:hover:text-primary-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150 ${
                  location === "/dashboard"
                    ? "border-primary-500 text-primary-500 dark:text-primary-400 dark:border-primary-400 font-medium"
                    : "text-gray-500 dark:text-gray-300"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className={`border-transparent hover:text-primary-500 dark:hover:text-primary-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150 ${
                  location === "/profile"
                    ? "border-primary-500 text-primary-500 dark:text-primary-400 dark:border-primary-400 font-medium"
                    : "text-gray-500 dark:text-gray-300"
                }`}
              >
                Profile
              </Link>
            </div>
          </div>

          {/* Right Nav Section */}
          <div className="flex items-center">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-3 flex items-center justify-center p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
            >
              <i className="ri-sun-line block dark:hidden text-xl"></i>
              <i className="ri-moon-line hidden dark:block text-xl"></i>
            </button>

            {/* Auth Buttons */}
            {!user ? (
              <div className="flex items-center space-x-3 ml-4">
                <Link href="/auth">
                  <Button
                    variant="outline"
                    className="text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-gray-600"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/auth" className="hidden sm:block">
                  <Button className="bg-primary-500 hover:bg-primary-600">Sign up</Button>
                </Link>
              </div>
            ) : (
              <div className="ml-4 flex items-center">
                <div className="relative">
                  <Link href="/profile">
                    <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800">
                      <div className="h-8 w-8 rounded-full bg-primary-200 dark:bg-primary-700 flex items-center justify-center">
                        <span className="text-primary-700 dark:text-primary-200 font-medium">
                          {user.displayName
                            ? `${user.displayName.split(" ")[0][0]}${
                                user.displayName.split(" ")[1]?.[0] || ""
                              }`
                            : user.email?.[0].toUpperCase() || "U"}
                        </span>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden ml-4">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:focus:ring-offset-gray-800"
              >
                <i className="ri-menu-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden ${
          mobileMenuOpen ? "flex" : "hidden"
        } flex-col pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 shadow-lg`}
      >
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          onClick={() => setMobileMenuOpen(false)}
        >
          Dashboard
        </Link>
        <Link
          href="/profile"
          className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          onClick={() => setMobileMenuOpen(false)}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}
