import { SkillsRadarBrowser } from "@/components/ui/skills-radar-browser"

export default function SkillsPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">My Skills</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12">
          Explore my technical expertise and professional competencies
        </p>

        {/* Skills Radar Browser */}
        <div className="w-full h-[600px] mb-16">
          <SkillsRadarBrowser />
        </div>
        
        {/* Additional skills content can be added below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Technical Skills</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-32 font-medium">Frontend</span>
                <div className="h-2 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-[95%] bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-full" />
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-32 font-medium">Backend</span>
                <div className="h-2 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-full" />
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-32 font-medium">UI/UX Design</span>
                <div className="h-2 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-full" />
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-32 font-medium">DevOps</span>
                <div className="h-2 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-[70%] bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-full" />
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Professional Skills</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-32 font-medium">Problem Solving</span>
                <div className="h-2 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-[90%] bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-full" />
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-32 font-medium">Communication</span>
                <div className="h-2 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-full" />
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-32 font-medium">Teamwork</span>
                <div className="h-2 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-[95%] bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-full" />
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-32 font-medium">Project Management</span>
                <div className="h-2 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-full" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}