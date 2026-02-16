import Link from "next/link";
import { Instagram } from "lucide-react";

import { cn } from "@/lib/utils";

const exploreLinks = [
  { href: "/#pricing", label: "Pricing" },
  { href: "/#our-work", label: "Our Work" },
  { href: "/#book", label: "Book Now" },
];

const companyLinks = [
  { href: "/#book", label: "Service Area" },
  { href: "/#book", label: "Hours" },
  { href: "/#book", label: "Request Quote" },
];

const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: Instagram,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/",
    icon: TikTokIcon,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1.7fr]">
          <div className="space-y-6">
            <Link
              href="/"
              className="font-serif text-2xl uppercase tracking-wider text-white"
            >
              Turbo Shine Exotics
            </Link>
            <p className="max-w-sm text-sm leading-6 text-white/70">
              Premium mobile detailing for exotic and performance vehicles.
              Discreet, on-site service with a showroom-level finish.
            </p>
            <div className="text-xs font-medium text-white/40">
              © {new Date().getFullYear()} Turbo Shine Exotics. All rights
              reserved.
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <FooterColumn heading="Explore" links={exploreLinks} />
            <FooterColumn heading="Company" links={companyLinks} />
            <FooterColumn heading="Legal" links={legalLinks} />
          </div>
        </div>
        <div className="mt-12 flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 p-2 text-white/60 transition-colors hover:border-white/40 hover:text-white"
                aria-label={link.name}
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  links,
  className,
}: {
  heading: string;
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-5", className)}>
      <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
        {heading}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M12 3c1.8 2.4 3.6 3.6 6 3.7v3.5c-2.3 0-4.2-.7-6-2" />
    </svg>
  );
}
