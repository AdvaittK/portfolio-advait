import { portfolioProjectCount } from "@/lib/featured-projects"
import { testimonials } from "@/lib/testimonials-data"

export type HomeStatBarItem = {
  value: string
  label: string
}

/** Marketing-style label: floor to nearest 5 (e.g. 19 → "15+", 11 → "10+"). */
export function statPlusLabel(count: number): string {
  if (count <= 0) return "0"
  if (count < 5) return `${count}+`
  return `${Math.floor(count / 5) * 5}+`
}

export const HOME_STAT_BAR_ITEMS: HomeStatBarItem[] = [
  { value: statPlusLabel(portfolioProjectCount), label: "Projects shipped" },
  { value: "3+", label: "Years experience" },
  { value: statPlusLabel(testimonials.length), label: "Client stories" },
]
