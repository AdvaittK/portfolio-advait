import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function LetsWorkTogetherSection() {
  return (
    <section
      className="w-full flex justify-center items-center pt-2 xs:pt-4 pb-8 xs:pb-12 sm:pb-16 px-4 xs:px-6 bg-transparent"
    >
      <div className="w-full max-w-3xl p-6 xs:p-8 sm:p-10 md:p-14 flex flex-col items-center text-center space-y-6 xs:space-y-8">
        <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
          Let's Work Together
        </h2>
        <p className="text-sm xs:text-base md:text-lg text-zinc-500 dark:text-zinc-400 mb-4 xs:mb-6 md:mb-8 max-w-lg mx-auto leading-relaxed">
          Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
        </p>

        <div className="w-full space-y-4 xs:space-y-6">
          <div className="flex flex-col xs:flex-row items-center gap-3 xs:gap-4 p-4 xs:p-5 rounded-xl bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50">
            <span className="flex items-center justify-center w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900">
              <Mail className="w-5 xs:w-6 h-5 xs:h-6 text-zinc-700 dark:text-zinc-200" />
            </span>
            <div className="flex flex-col items-center xs:items-start">
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-0.5">Email</span>
              <a href="mailto:advaitt.dev@gmail.com" className="font-semibold text-zinc-800 dark:text-zinc-100 hover:underline text-sm xs:text-base tracking-tight transition-colors duration-150 hover:text-primary dark:hover:text-primary">
                advaitt.dev@gmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-col xs:flex-row items-center gap-3 xs:gap-4 p-4 xs:p-5 rounded-xl bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50">
            <span className="flex items-center justify-center w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900">
              <Phone className="w-5 xs:w-6 h-5 xs:h-6 text-zinc-700 dark:text-zinc-200" />
            </span>
            <div className="flex flex-col items-center xs:items-start">
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-0.5">Phone</span>
              <a href="tel:+919975556093" className="font-semibold text-zinc-800 dark:text-zinc-100 hover:underline text-sm xs:text-base tracking-tight transition-colors duration-150 hover:text-primary dark:hover:text-primary">
                +91 99755 56093
              </a>
            </div>
          </div>

        </div>

        <Link href="/contact" className="flex justify-center w-full mt-4 xs:mt-6">
          <Button className="w-full xs:w-auto rounded-full px-6 xs:px-8 py-5 xs:py-6 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-sm xs:text-base font-semibold">
            Contact Me <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
} 