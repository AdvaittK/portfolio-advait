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
  { value: "300K+", label: "Total impressions" },
  { value: "+25%", label: "Avg conversion lift" },
  { value: "15+", label: "Clients worldwide" },
]
