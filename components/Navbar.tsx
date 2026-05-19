"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BrandName } from "@/components/BrandName";
import { NAV_LINKS } from "@/lib/form-config";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] h-[4.5rem] border-b border-gold/25 bg-navy-900 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.25)]" : ""
        }`}
      >
        <div className="mx-auto flex h-full w-[min(100%-2rem,72rem)] items-center justify-between">
          <Link
            href="#inicio"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="InstaWeb — Inicio"
            onClick={closeMobile}
          >
            <Image src="/logo.svg" alt="" width={36} height={36} className="h-9 w-9" />
            <BrandName size="sm" />
          </Link>

          <nav aria-label="Navegación principal" className="hidden md:block">
            <ul className="flex items-center">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-3 text-xl leading-none text-white/35" aria-hidden>
                      ·
                    </span>
                  )}
                  <Link
                    href={link.href}
                    className="text-xs font-semibold uppercase tracking-widest text-white/90 transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] p-2 md:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="nav-mobile"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span
              className={`block h-0.5 w-full rounded-sm bg-white transition-transform duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full rounded-sm bg-white transition-opacity duration-150 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full rounded-sm bg-white transition-transform duration-300 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <nav
        id="nav-mobile"
        aria-label="Menú móvil"
        className={`fixed inset-x-0 top-[4.5rem] bottom-0 z-[99] bg-navy-900 p-6 transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        hidden={!mobileOpen}
      >
        <ul className="flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMobile}
                className="block border-b border-white/8 py-4 text-sm font-semibold uppercase tracking-widest text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
