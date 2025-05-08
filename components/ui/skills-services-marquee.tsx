import Marquee from "react-fast-marquee";
import { SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb, SiPostgresql, SiGit, SiDocker, SiFigma } from "react-icons/si";
import { Code2, Layout, Server, Database, LineChart, Shield } from "lucide-react";

const items = [
  { icon: <SiReact className="w-4 xs:w-5 h-4 xs:h-5 text-blue-500" />, label: "React" },
  { icon: <SiTypescript className="w-4 xs:w-5 h-4 xs:h-5 text-blue-600" />, label: "TypeScript" },
  { icon: <SiNextdotjs className="w-4 xs:w-5 h-4 xs:h-5" />, label: "Next.js" },
  { icon: <SiTailwindcss className="w-4 xs:w-5 h-4 xs:h-5 text-cyan-500" />, label: "Tailwind CSS" },
  { icon: <SiNodedotjs className="w-4 xs:w-5 h-4 xs:h-5 text-green-600" />, label: "Node.js" },
  { icon: <SiMongodb className="w-4 xs:w-5 h-4 xs:h-5 text-green-500" />, label: "MongoDB" },
  { icon: <SiPostgresql className="w-4 xs:w-5 h-4 xs:h-5 text-blue-400" />, label: "PostgreSQL" },
  { icon: <SiGit className="w-4 xs:w-5 h-4 xs:h-5 text-orange-500" />, label: "Git" },
  { icon: <SiDocker className="w-4 xs:w-5 h-4 xs:h-5 text-blue-500" />, label: "Docker" },
  { icon: <SiFigma className="w-4 xs:w-5 h-4 xs:h-5" />, label: "Figma" },
  { label: "Full Stack Development", icon: <Code2 className="w-6 h-6 text-zinc-700 dark:text-zinc-200" /> },
  { label: "Frontend Development", icon: <Layout className="w-6 h-6 text-zinc-700 dark:text-zinc-200" /> },
  { label: "Backend Development", icon: <Server className="w-6 h-6 text-zinc-700 dark:text-zinc-200" /> },
  { label: "CRM Dashboard", icon: <Database className="w-6 h-6 text-zinc-700 dark:text-zinc-200" /> },
  { label: "SEO & Performance", icon: <LineChart className="w-6 h-6 text-zinc-700 dark:text-zinc-200" /> },
  { label: "Security Solutions", icon: <Shield className="w-6 h-6 text-zinc-700 dark:text-zinc-200" /> },
];

export function SkillsServicesMarquee() {
  return (
    <div className="w-full flex justify-center py-4 xs:py-6">
      <div className="w-full max-w-5xl rounded-xl bg-gradient-to-br from-white/80 via-zinc-100/70 to-zinc-200/80 dark:from-zinc-900/80 dark:via-zinc-800/70 dark:to-zinc-900/80 border border-zinc-200/60 dark:border-zinc-700/60 shadow-lg backdrop-blur-md">
        <Marquee gradient={false} speed={40} pauseOnHover className="py-2 xs:py-3">
          {items.map((item, idx) => (
            <div
              key={item.label + idx}
              className="flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 mx-1 xs:mx-2 rounded-lg bg-white/60 dark:bg-zinc-800/60 shadow-sm border border-zinc-200/40 dark:border-zinc-700/40 backdrop-blur-sm hover:scale-105 transition-transform duration-200"
            >
              {item.icon}
              <span className="font-medium text-zinc-700 dark:text-zinc-200 text-xs xs:text-sm whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
} 