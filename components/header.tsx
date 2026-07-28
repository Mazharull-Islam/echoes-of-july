import Link from "next/link";

import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: string;
};

const NAV_LINKS: ReadonlyArray<NavLink> = [
  { href: "/", label: "Home" },
  { href: "/timeline", label: "Timeline" },
  { href: "/reflection", label: "Reflection" },
];

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <Container className="flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight sm:text-base"
        >
          Echoes of July
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 sm:gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex h-8 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
