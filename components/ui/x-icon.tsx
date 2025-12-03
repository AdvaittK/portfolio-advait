"use client";
import React from "react";
import { Icon } from "@iconify/react";

type Props = {
  className?: string;
};

// X (formerly Twitter) brand icon via Iconify (simple-icons:x)
export function XIcon({ className }: Props) {
  return <Icon icon="simple-icons:x" className={className} aria-hidden="true" />;
}

export default XIcon;