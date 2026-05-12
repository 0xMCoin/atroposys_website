import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * CSS-only horizontal marquee. Children are rendered twice so the loop is
 * seamless. Pauses on hover and disables itself under reduced motion (CSS).
 */
export function Marquee({
  children,
  duration = 38,
  reverse = false,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn("marquee", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div
        className="marquee-track"
        data-direction={reverse ? "reverse" : undefined}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
