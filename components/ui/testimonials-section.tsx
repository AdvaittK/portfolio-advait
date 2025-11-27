import { motion } from "framer-motion"
import { Quote, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./button"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	type CarouselApi,
} from "./carousel"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog"
import { useState, useEffect } from "react"

// Shweta moved to top per request (order reflects recency/priority)
const testimonials = [
	{
		name: "Shweta Mishra",
		role: "Quantum Manifestation Coach",
		image: "/shweta.webp",
		content:
			"The website looks perfect and came out beautifully. I’m really happy with the result. Thank you!",
		projectLink: "https://www.shwetamishra.in/",
	},
	{
		name: "Sizz",
		role: "Owner, Sizzle Studios",
		image: "/sizz.webp",
		content:
			"Advait made my agency's website look way better than I thought it could. Super chill to work with, no unnecessary jargon, just solid results.",
		projectLink: "https://www.sizzlestudio.in/",
	},
	{
    	name: "Management at Oriental Air & Ship Services",
    	role: "",
    	image: "/fav.png",
    	content:
    		"Advait did an amazing job creating Oriental's website! He really captured the professionalism and trust we've built over 40 years in logistics. The site is modern, easy to navigate, and perfectly showcases our services. Communication was smooth and quick",
    	projectLink: "https://www.orientalimited.com/",
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
	const [desktopApi, setDesktopApi] = useState<CarouselApi>()
	const [mobileApi, setMobileApi] = useState<CarouselApi>()
	const [desktopCurrent, setDesktopCurrent] = useState(0)
	const [mobileCurrent, setMobileCurrent] = useState(0)
	const [desktopCount, setDesktopCount] = useState(0)
	const [mobileCount, setMobileCount] = useState(0)

	useEffect(() => {
		if (!desktopApi) return

		setDesktopCount(desktopApi.scrollSnapList().length)
		setDesktopCurrent(desktopApi.selectedScrollSnap())

		desktopApi.on("select", () => {
			setDesktopCurrent(desktopApi.selectedScrollSnap())
		})
	}, [desktopApi])

	useEffect(() => {
		if (!mobileApi) return

		setMobileCount(mobileApi.scrollSnapList().length)
		setMobileCurrent(mobileApi.selectedScrollSnap())

		mobileApi.on("select", () => {
			setMobileCurrent(mobileApi.selectedScrollSnap())
		})
	}, [mobileApi])

	const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => (
		<Dialog>
			<DialogTrigger asChild>
				<div className="flex flex-col h-full w-full min-h-[420px] max-h-[420px] bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/10 dark:hover:shadow-zinc-100/10">
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
						<Button
							className="w-full rounded-full px-4 py-2 bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-xs font-semibold transition-all duration-300 group hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-zinc-100/5"
							disabled={!testimonial.projectLink}
							onClick={(e) => {
								if (!testimonial.projectLink) return
								e.stopPropagation()
								window.open(testimonial.projectLink, '_blank', 'noopener,noreferrer')
							}}
						>
							View Project
							<ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
						</Button>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
						{testimonial.name}
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-6">
					<div className="flex items-center space-x-4">
						<div className="relative w-16 h-16 rounded-lg overflow-hidden ring-2 ring-zinc-200/50 dark:ring-zinc-700/50">
							<Image
								src={testimonial.image}
								alt={testimonial.name}
								fill
								className="object-cover"
							/>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
								{testimonial.name}
							</h3>
							<p className="text-sm text-zinc-600 dark:text-zinc-400">
								{testimonial.role}
							</p>
						</div>
					</div>
					<div className="bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 rounded-xl p-6">
						<div className="flex items-start space-x-3">
							<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 p-1.5 shadow-md flex-shrink-0">
								<Quote className="w-full h-full text-zinc-100" />
							</div>
							<p className="text-zinc-700 dark:text-zinc-400 text-base leading-relaxed font-medium">
								{testimonial.content}
							</p>
						</div>
					</div>
					<div className="flex justify-center">
						<Button
							className="rounded-full px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-700 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg font-semibold transition-all duration-300 group hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-zinc-100/5"
							disabled={!testimonial.projectLink}
							onClick={() => {
								if (!testimonial.projectLink) return
								window.open(testimonial.projectLink, '_blank', 'noopener,noreferrer')
							}}
						>
							View Project
							<ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)

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
					{/* Desktop Carousel */}
					<div className="hidden md:block">
						<div className="overflow-hidden w-full">
							<Carousel 
								setApi={setDesktopApi}
								opts={{ 
									align: "start", 
									slidesToScroll: 1, 
									loop: false,
									dragFree: true,
									containScroll: "trimSnaps"
								}} 
								className="w-full"
							>
								<CarouselContent className="-ml-2">
									{testimonials.map((testimonial, index) => (
										<CarouselItem key={index} className="pl-2 basis-1/3 min-w-0 flex-shrink-0">
											<TestimonialCard testimonial={testimonial} index={index} />
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>
						</div>
						{/* Desktop Navigation Arrows */}
						<div className="flex justify-center mt-8 space-x-4">
							<Button
								variant="outline"
								size="icon"
								className="h-12 w-12 rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
								disabled={desktopCurrent === 0}
								onClick={() => desktopApi?.scrollPrev()}
							>
								<ChevronLeft className="h-5 w-5" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="h-12 w-12 rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
								disabled={desktopCurrent === desktopCount - 1}
								onClick={() => desktopApi?.scrollNext()}
							>
								<ChevronRight className="h-5 w-5" />
							</Button>
						</div>
					</div>

					{/* Mobile Carousel */}
					<div className="md:hidden">
						<div className="overflow-hidden w-full">
							<Carousel 
								setApi={setMobileApi}
								opts={{ 
									align: "start", 
									slidesToScroll: 1, 
									loop: false,
									dragFree: true,
									containScroll: "trimSnaps"
								}} 
								className="w-full"
							>
								<CarouselContent className="-ml-2">
									{testimonials.map((testimonial, index) => (
										<CarouselItem key={index} className="pl-2 basis-full min-w-0 flex-shrink-0">
											<TestimonialCard testimonial={testimonial} index={index} />
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>
						</div>
						{/* Mobile Navigation Arrows */}
						<div className="flex justify-center mt-6 space-x-4">
							<Button
								variant="outline"
								size="icon"
								className="h-10 w-10 rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
								disabled={mobileCurrent === 0}
								onClick={() => mobileApi?.scrollPrev()}
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="h-10 w-10 rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
								disabled={mobileCurrent === mobileCount - 1}
								onClick={() => mobileApi?.scrollNext()}
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}