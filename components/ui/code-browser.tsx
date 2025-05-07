"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Copy, Check, ChevronRight, Maximize2, Minimize2, Code2 } from "lucide-react"

interface CodeBrowserProps {
  className?: string
  children?: React.ReactNode
  title?: string
  language?: "typescript" | "javascript" | "python" | "html" | "css" | "json"
  code?: string
  showLineNumbers?: boolean
  editable?: boolean
  readOnly?: boolean
}

export const CodeBrowser = ({
  className,
  children,
  title = "code.ts",
  language = "typescript",
  code = `// Welcome to my portfolio
const developer = {
  name: "Advait",
  role: "Full Stack Developer",
  skills: [
    "React", "TypeScript", 
    "Next.js", "Node.js",
    "UI/UX Design"
  ],
  contact: "hello@advait.dev"
};

// I build elegant web experiences
function createAwesomeProject() {
  const design = createResponsiveDesign();
  const frontend = buildReactComponents();
  const backend = setupApiEndpoints();
  
  return {
    result: "Beautiful web application",
    performance: "Optimized",
    userExperience: "Exceptional"
  };
}

// Let's work together!
const hire = () => developer.contact;`,
  showLineNumbers = true,
  editable = false,
  readOnly = true
}: CodeBrowserProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [cursor, setCursor] = useState({ blinking: true, position: code.length })
  const [copied, setCopied] = useState(false)
  const [showFileTree, setShowFileTree] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Split code into lines for easier rendering with line numbers
  const codeLines = code.split('\n')

  // Enhanced syntax highlighting classes
  const getTokenClass = (token: string, language: string): string => {
    // Keywords
    if (/^(const|let|var|function|return|async|await|if|else|for|while|import|export|from|default|class|extends|interface|type|new|this|true|false|null|undefined)$/.test(token)) {
      return "text-purple-500 dark:text-purple-400 font-medium";
    }
    // Strings
    if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) {
      return "text-emerald-500 dark:text-emerald-400";
    }
    // Numbers
    if (/^\d+$/.test(token)) {
      return "text-blue-500 dark:text-blue-400";
    }
    // Comments
    if (token.trim().startsWith('//')) {
      return "text-zinc-400 dark:text-zinc-500 italic";
    }
    // Functions
    if (/\w+\(/.test(token)) {
      return "text-amber-600 dark:text-amber-400 font-medium";
    }
    // Objects and properties
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token) && !token.match(/^(const|let|var|function|return|async|await|if|else|for|while|import|export|from|default|class|extends|interface|type|new|this|true|false|null|undefined)$/)) {
      return "text-sky-500 dark:text-sky-400";
    }
    // Brackets, operators etc.
    if (/[[\]{}()=+\-*/<>!|&;:,.]/.test(token)) {
      return "text-zinc-500 dark:text-zinc-400";
    }
    return "text-zinc-800 dark:text-zinc-200";
  }

  // Enhanced syntax highlighter
  const highlightCode = (line: string, language: string): React.ReactNode[] => {
    const tokens = line.split(/(\s+|[[\]{}()=+\-*/<>!|&;:,."]|'[^']*'|`[^`]*`|"[^"]*"|\d+)/g).filter(Boolean);
    
    return tokens.map((token, i) => {
      if (/^\s+$/.test(token)) {
        return <span key={i}>{token}</span>;
      }
      
      const tokenClass = getTokenClass(token, language);
      return <span key={i} className={tokenClass}>{token}</span>;
    });
  }

  useEffect(() => {
    setIsMounted(true)
    
    const interval = setInterval(() => {
      setCursor(prev => ({ ...prev, blinking: !prev.blinking }));
    }, 530);
    
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttonVariants = {
    hover: (i: number) => ({
      scale: 1.1,
      transition: {
        duration: 0.2,
        delay: i * 0.05
      }
    }),
    tap: {
      scale: 0.95
    }
  }

  return (
    <motion.div 
      className={cn(
        "w-full h-full rounded-xl overflow-hidden border shadow-2xl",
        "border-zinc-200/50 bg-zinc-50/50 dark:border-zinc-700/50 dark:bg-zinc-900/50",
        "backdrop-blur-sm",
        isFullscreen ? "fixed inset-4 z-50" : "relative",
        className
      )}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 pointer-events-none" />
      
      {/* Browser chrome/header */}
      <div className="h-12 bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 border-b border-zinc-200/50 dark:border-zinc-700/50 flex items-center px-4 gap-2">
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-3.5 h-3.5 rounded-full bg-red-400 hover:bg-red-500 cursor-pointer shadow-sm"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            custom={0}
          />
          <motion.div 
            className="w-3.5 h-3.5 rounded-full bg-amber-400 hover:bg-amber-500 cursor-pointer shadow-sm"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            custom={1}
          />
          <motion.div 
            className="w-3.5 h-3.5 rounded-full bg-green-400 hover:bg-green-500 cursor-pointer shadow-sm"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            custom={2}
          />
        </div>
        
        <div className="flex-1 flex justify-center">
          <motion.div 
            className="px-4 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2 rounded-full bg-white/50 dark:bg-zinc-800/50 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="font-medium">{title}</span>
          </motion.div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={handleCopyCode}
            className="p-1.5 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="text-emerald-500"
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="text-zinc-500"
                >
                  <Copy className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-zinc-500" />
            ) : (
              <Maximize2 className="w-4 h-4 text-zinc-500" />
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Code editor body */}
      <div className="overflow-auto h-[calc(100%-3rem)] bg-white/50 dark:bg-zinc-950/50 font-mono text-sm relative backdrop-blur-sm">
        {/* File tree */}
        <AnimatePresence>
          {showFileTree && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "220px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="absolute left-0 top-0 bottom-0 border-r border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50 p-3 backdrop-blur-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>portfolio</span>
                </div>
                <div className="pl-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>src</span>
                  </div>
                  <div className="pl-4 space-y-1">
                    <div className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer">components/</div>
                    <div className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer">pages/</div>
                    <div className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer">styles/</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={cn(
          "p-4",
          showFileTree && "pl-[240px]"
        )}>
          <div className="flex flex-col">
            {codeLines.map((line, index) => (
              <motion.div 
                key={index} 
                className="flex group"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* Line numbers */}
                {showLineNumbers && (
                  <div className="w-8 text-right pr-3 select-none text-zinc-400 dark:text-zinc-600 text-xs group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors">
                    {index + 1}
                  </div>
                )}
                
                {/* Code content with highlighting */}
                <div className="flex-1 overflow-x-auto">
                  {highlightCode(line, language)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Status bar */}
        <div className="absolute bottom-0 left-0 right-0 h-7 bg-gradient-to-t from-zinc-50/50 to-zinc-50/30 dark:from-zinc-900/50 dark:to-zinc-900/30 border-t border-zinc-200/50 dark:border-zinc-800/50 flex items-center px-4 text-xs text-zinc-500 dark:text-zinc-400 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="font-medium">{language}</span>
            <span>{codeLines.length} lines</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}