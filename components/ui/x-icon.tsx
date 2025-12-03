"use client";
import React from "react";

type Props = {
  className?: string;
};

// Minimal X (formerly Twitter) logo SVG
export function XIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.6 9.9 20.7 2h-2.6l-5.9 6.7L7.5 2H2l7.6 10.8L2.7 22h2.6l6.4-7.3 4.1 7.3H22l-8.4-12.1Zm-2.3 2.6-.7-.9L6 4h1.9l3.7 6.6.6.9 6.1 10.5h-1.9l-5.1-8.5Z" />
    </svg>
  );
}

export default XIcon;