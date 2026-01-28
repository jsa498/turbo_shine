"use client";

import { cn } from "@/lib/utils";

interface AnimatedHamburgerProps {
  isOpen: boolean;
  className?: string;
}

export function AnimatedHamburger({
  isOpen,
  className,
}: AnimatedHamburgerProps) {
  return (
    <div
      className={cn(
        "relative flex h-6 w-6 flex-col items-center justify-center gap-[4px] overflow-hidden",
        className,
      )}
    >
      <span
        className={cn(
          "w-4 h-0.5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
          isOpen ? "translate-y-[6px] -rotate-45" : "",
        )}
      />
      <span
        className={cn(
          "w-4 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-full opacity-0" : "",
        )}
      />
      <span
        className={cn(
          "w-4 h-0.5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
          isOpen ? "-translate-y-[6px] rotate-45" : "",
        )}
      />
    </div>
  );
}
