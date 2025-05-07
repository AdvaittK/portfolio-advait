import Marquee from "react-fast-marquee";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiPostgresql, SiGit, SiDocker, SiFigma } from "react-icons/si";
import { Code2, Layout, Server, Database, LineChart, Shield } from "lucide-react";

const items = [
  { label: "React.js", icon: <SiReact className="w-6 h-6 text-sky-500" /> },
  { label: "Next.js", icon: <SiNextdotjs className="w-6 h-6 text-black dark:text-white" /> },
  { label: "TypeScript", icon: <SiTypescript className="w-6 h-6 text-blue-600" /> },
  { label: "Tailwind CSS", icon: <SiTailwindcss className="w-6 h-6 text-cyan-500" /> },
  { label: "Node.js", icon: <SiNodedotjs className="w-6 h-6 text-green-600" /> },
  { label: "MongoDB", icon: <SiMongodb className="w-6 h-6 text-green-700" /> },
  { label: "PostgreSQL", icon: <SiPostgresql className="w-6 h-6 text-blue-800" /> },
  { label: "Git", icon: <SiGit className="w-6 h-6 text-orange-500" /> },
  { label: "Docker", icon: <SiDocker className="w-6 h-6 text-sky-700" /> },
  { label: "Figma", icon: <SiFigma className="w-6 h-6 text-pink-500" /> },
  { label: "Full Stack Development", icon: <Code2 className="w-6 h-6 text-zinc-700 dark:text-zinc-200" /> },
  { label: "Frontend Development", icon: <Layout className="w-6 h-6 text-zinc-700 dark:text-zinc-200" /> },
  { label: "Backend Development", icon: <Server className="w-6 h-6 text-zinc-700 dark:text-zinc-200" /> },
  { label: "CRM Dashboard", icon: <Database className="w-6 h-6 text-zinc-700 dark:text-zinc-200" /> },
  { label: "SEO & Performance", icon: <LineChart className="w-6 h-6 text-zinc-700 dark:text-zinc-200" /> },
  { label: "Security Solutions", icon: <Shield className="w-6 h-6 text-zinc-700 dark:text-zinc-200" /> },
];

export function SkillsServicesMarquee() {
  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-full max-w-5xl rounded-xl bg-gradient-to-br from-white/80 via-zinc-100/70 to-zinc-200/80 dark:from-zinc-900/80 dark:via-zinc-800/70 dark:to-zinc-900/80 border border-zinc-200/60 dark:border-zinc-700/60 shadow-lg backdrop-blur-md">
        <Marquee gradient={false} speed={40} pauseOnHover className="py-3">
          {items.map((item, idx) => (
            <div
              key={item.label + idx}
              className="flex items-center gap-2 px-6 py-2 mx-2 rounded-lg bg-white/60 dark:bg-zinc-800/60 shadow-sm border border-zinc-200/40 dark:border-zinc-700/40 backdrop-blur-sm hover:scale-105 transition-transform duration-200"
            >
              {item.icon}
              <span className="font-medium text-zinc-700 dark:text-zinc-200 text-sm whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
} 