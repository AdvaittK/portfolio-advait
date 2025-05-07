import React from "react";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

export const LogoMark: React.FC<LogoMarkProps> = ({ className }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-colors", className)}
    >
      <path
        d="M16 2L2 30H30L16 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 22H23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LogoMark;