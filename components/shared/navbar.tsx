"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { AnimatedHamburger } from "@/components/ui/animated-hamburger";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/our-work", label: "Our Work" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState(() => ({
    isOpen: false,
    pathname,
  }));
  const isOpen = menuState.isOpen && menuState.pathname === pathname;

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setMenuState((prev) => {
      const currentlyOpen = prev.isOpen && prev.pathname === pathname;
      return { isOpen: !currentlyOpen, pathname };
    });
  };
  const closeMenu = () => setMenuState({ isOpen: false, pathname });

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed top-6 z-50 flex w-full px-6 md:top-8 md:px-0 transition-all duration-500 ease-in-out",
          pathname === "/"
            ? "justify-start md:justify-center"
            : "justify-center",
        )}
      >
        <div className="pointer-events-auto relative flex w-full max-w-[calc(100vw-3rem)] items-center justify-between rounded-full bg-black px-6 py-3 text-white shadow-lg md:w-auto md:max-w-fit md:gap-8 transition-all duration-300">
          <Link
            href="/"
            className="font-serif text-xl uppercase tracking-wide transition-opacity hover:opacity-80"
            onClick={closeMenu}
          >
            TURBO SHINE
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm transition-colors hover:bg-white hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              className="hidden rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90 hover:text-black md:inline-flex"
            >
              <Link href="/book">Book Now</Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full p-0 text-white transition-colors hover:bg-white/20 hover:text-white md:hidden"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              <AnimatedHamburger isOpen={isOpen} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay & Content */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        id="mobile-nav"
        className={cn(
          "fixed left-6 right-6 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.725,0.25,1)] md:hidden",
          isOpen
            ? "top-[calc(1.5rem+60px+1rem)] opacity-100 translate-y-0 scale-100" // 1.5rem (top-6) + 60px (approx header height) + 1rem (spacing)
            : "top-[calc(1.5rem+60px+1rem)] opacity-0 -translate-y-4 scale-95 pointer-events-none",
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-md">
          <div className="space-y-2 p-4">
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-2 border-t border-white/10 pt-4">
              <Button
                asChild
                className="w-full rounded-full bg-white py-6 text-base font-medium text-black hover:bg-white/90"
              >
                <Link href="/book" onClick={closeMenu}>
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
