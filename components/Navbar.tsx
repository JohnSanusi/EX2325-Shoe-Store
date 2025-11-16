"use client";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCartIcon, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Logo from "./Logo";
import { useInView } from "@/lib/hooks/useInView";

const Navbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();
  const aboutInView = useInView("about");
  const contactInView = useInView("contact");

  const isActive = useCallback(
    (link: string) => {
      if (link === "/") return pathname === "/";
      if (link === "/shop") return pathname === "/shop";
      if (link === "/#about") return aboutInView;
      if (link === "/#contact") return contactInView;
      return false;
    },
    [pathname, aboutInView, contactInView]
  );
  const links = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/#about",
      name: "About",
    },
    {
      link: "/shop",
      name: "Shop",
    },
    {
      link: "/#contact",
      name: "Contact",
    },
  ];
  useEffect(() => {
    const saved =
      typeof window !== "undefined" && localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved as "dark" | "light");
    } else if (typeof window !== "undefined") {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    if (typeof window !== "undefined") localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl rounded-xl px-4 md:px-6 py-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-md border border-border flex items-center justify-between gap-4 z-50">
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <Logo className="h-8 w-auto" />
          </motion.div>
        </div>

        <ul className="hidden md:flex flex-row gap-6 items-center">
          {links.map((link, index) => (
            <motion.div
              key={index}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <li>
                <Link
                  className={`text-base md:text-lg tracking-wide transition-colors ${
                    isActive(link.link)
                      ? "text-orange-600 font-semibold"
                      : "hover:text-orange-600"
                  }`}
                  href={link.link}
                >
                  {link.name}
                </Link>
              </li>
            </motion.div>
          ))}
        </ul>

        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex items-center gap-3"
        >
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="p-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>

          <CartButton />
        </motion.div>
      </nav>
    </motion.div>
  );
};

const CartButton: React.FC = () => {
  const { count, openCart } = useCart();
  return (
    <button
      aria-label="Open cart"
      onClick={openCart}
      className="relative p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
    >
      <ShoppingCartIcon className="h-5 w-5 text-foreground hover:text-orange-600" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 rounded-full bg-orange-600 text-white text-[10px] px-1.5 py-0.5">
          {count}
        </span>
      )}
    </button>
  );
};

export default Navbar;
