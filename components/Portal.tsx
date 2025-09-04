import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current && typeof window !== "undefined") {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    setMounted(true);
    const modalRoot = document.body;
    const el = elRef.current;
    
    if (el) {
      modalRoot.appendChild(el);
    }
    
    return () => {
      if (el) {
        modalRoot.removeChild(el);
      }
    };
  }, []);

  return mounted && elRef.current ? createPortal(children, elRef.current) : null;
} 