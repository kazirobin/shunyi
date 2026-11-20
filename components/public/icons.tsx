import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Arrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" className="i-arrow" {...base} {...props}>
      <path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" />
    </svg>
  );
}

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...props}>
      <path d="M6 14 14 6M7.5 6H14v6.5" />
    </svg>
  );
}

export function Plus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...props}>
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

export function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" {...base} strokeWidth={2.2} {...props}>
      <path d="M4.5 10.5 8.2 14 15.5 6" pathLength={1} />
    </svg>
  );
}

export function Mail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...props}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="m3 5.5 7 5.5 7-5.5" />
    </svg>
  );
}

export function Chat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...props}>
      <path d="M10 3.5a6.5 6.5 0 0 0-5.6 9.8L3.5 16.5l3.3-.9A6.5 6.5 0 1 0 10 3.5Z" />
    </svg>
  );
}

export function Phone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...props}>
      <path d="M5 3.5h2.6l1.3 3.4-1.7 1.1a8 8 0 0 0 4.8 4.8l1.1-1.7 3.4 1.3V15a1.5 1.5 0 0 1-1.6 1.5A12.6 12.6 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5Z" />
    </svg>
  );
}

export function Pin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...props}>
      <path d="M10 17s5.5-4.8 5.5-9a5.5 5.5 0 0 0-11 0c0 4.2 5.5 9 5.5 9Z" />
      <circle cx="10" cy="8" r="2" />
    </svg>
  );
}
