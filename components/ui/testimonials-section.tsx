import { motion } from "framer-motion"
import { Quote, ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./button"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "./carousel"

const testimonials = [
	{
    	name: "Management at Oriental Air & Ship Services",
    	role: "",
    	image: "/fav.png",
    	content:
    		"Advait did an amazing job creating Oriental’s website! He really captured the professionalism and trust we’ve built over 40 years in logistics. The site is modern, easy to navigate, and perfectly showcases our services. Communication was smooth and quick",
    	projectLink: "#",
  	},
	{
		name: "Pranjal Garg",
		role: "Founder, VITIRA",
		image: "/pranjal.jpg",
		content:
			"Advait did a great job transforming our website at VITIRA. He delivered exactly what we needed.",
		projectLink: "https://www.vitira.in/",
	},
	{
		name: "Dem",
		role: "Professional Thumbnail Designer",
		image: "/dem.webp",
		content:
			"Advait did an amazing job creating my website! He's super passionate about his work and delivered exactly what I wanted. Communication was quick and friendly, and the entire process was faster than expected. I'm totally happy with the result... highly recommended!",
		projectLink: "https://www.dems8.com/",
	},
	{
		name: "Srihita Vanguri",
		role: "Founder, UVOKA",
		image: "/sri.webp",
		content:
			"Advait has done a great job at building our website. He has revamped our whole website from scratch and his delivery is seamless. Would definitely recommend him for all your Web development needs.",
		projectLink: "https://uvoka.in",
	},
	{
		name: "Sahil Kohli",
		role: "Owner, CardHint",
		image: "/cardhint.png",
		content:
			"Working with Advait on the makeover of CardHint.com was a fantastic experience. He brought fresh design ideas, improved the site's performance, and delivered everything on time with attention to detail. The upgrade has made a huge difference in both usability and visual appeal.",
		projectLink: "https://cardhint.com/",
	},
	{
		name: "Lalith Kumar",
		role: "Owner, Royal Sarees",
		image: "/royal.png",
		content:
			"Advait did a fantastic job with our Royal Sarees website. He understood exactly what we needed and delivered a clean, elegant design that really showcases our brand. Super easy to work with and very professional throughout.",
		projectLink: "https://royalsarees.advaitt.tech/",
	},
	
]

export function TestimonialsSection() {
	return (
		<section className="py-16 md:py-24 relative overflow-hidden">
			<div className="container mx-auto px-4 sm:px-6 relative">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-24"
				>
					<div className="flex items-center justify-center mb-3">
						<span className="h-[1px] w-10 bg-gradient-to-r from-zinc-400/60 to-zinc-600/60 dark:from-zinc-500/60 dark:to-zinc-300/60"></span>
						<span className="px-4 text-sm font-medium tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
							Testimonials
						</span>
						<span className="h-[1px] w-10 bg-gradient-to-r from-zinc-600/60 to-zinc-400/60 dark:from-zinc-300/60 dark:to-zinc-500/60"></span>
					</div>

					<h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-300 leading-tight">
						What My Clients Say
					</h2>

					<p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
						Hear what some of my clients have to say about their experience
						working with me
					</p>

					<div className="flex justify-center">
						<div className="h-[3px] w-24 bg-gradient-to-r from-zinc-300/60 via-zinc-500/80 to-zinc-300/60 dark:from-zinc-600/60 dark:via-zinc-400/80 dark:to-zinc-600/60 rounded-full"></div>
					</div>
				</motion.div>

				<div className="relative max-w-7xl mx-auto">
					<Carousel opts={{ align: "start", slidesToScroll: 1, loop: false }} className="w-full">
						<CarouselPrevious />
						<CarouselNext />
						<CarouselContent className="px-4">
							{testimonials.map((testimonial, index) => (
								<CarouselItem key={index} className="flex md:basis-1/3 basis-full px-2">
									<div className="flex flex-col h-full w-full min-h-[420px] max-h-[420px] bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 p-6">
										<div className="mb-4">
											<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-2 shadow-md">
												<Quote className="w-full h-full text-zinc-100" />
											</div>
										</div>
										<p className="text-zinc-700 dark:text-zinc-400 text-base leading-relaxed mb-6 flex-grow font-medium line-clamp-5">
											{testimonial.content}
										</p>
										<div className="mt-auto">
											<div className="flex items-center justify-between mb-4">
												<div className="flex items-center">
													<div className="relative w-10 h-10 rounded-lg overflow-hidden mr-3 ring-2 ring-zinc-200/50 dark:ring-zinc-700/50">
														<Image
															src={testimonial.image}
															alt={testimonial.name}
															fill
															className="object-cover"
														/>
													</div>
													<div>
														<h4 className="font-semibold text-zinc-800 dark:text-zinc-100 text-sm">
															{testimonial.name}
														</h4>
														<p className="text-xs text-zinc-600 dark:text-zinc-400">
															{testimonial.role}
														</p>
													</div>
												</div>
											</div>
											<a
												href={testimonial.projectLink}
												target="_blank"
												rel="noopener noreferrer"
												className="block"
											>
												<Button
													className="w-full rounded-full px-4 py-2 bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-xs font-semibold transition-all duration-300 group hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-zinc-100/5"
												>
													View Project
													<ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
												</Button>
											</a>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</div>
		</section>
	)
}