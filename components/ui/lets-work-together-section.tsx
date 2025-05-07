import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function LetsWorkTogetherSection() {
  return (
    <motion.section
      className="w-full flex justify-center items-center py-24 px-4 bg-transparent"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="w-full max-w-3xl p-10 md:p-14 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
          Let's Work Together
        </h2>
        <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 mb-8 max-w-lg mx-auto leading-relaxed">
          Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
        </p>
        <div className="flex flex-row justify-center gap-8 mb-8 w-full">
          <div className="flex flex-row items-center gap-4">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900">
              <Mail className="w-6 h-6 text-zinc-700 dark:text-zinc-200" />
            </span>
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-0.5">Email</span>
              <a href="mailto:advaitt.dev@gmail.com" className="font-semibold text-zinc-800 dark:text-zinc-100 hover:underline text-base tracking-tight transition-colors duration-150 hover:text-primary dark:hover:text-primary">
                advaitt.dev@gmail.com
              </a>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900">
              <Phone className="w-6 h-6 text-zinc-700 dark:text-zinc-200" />
            </span>
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-0.5">Phone</span>
              <a href="tel:+919975556093" className="font-semibold text-zinc-800 dark:text-zinc-100 hover:underline text-base tracking-tight transition-colors duration-150 hover:text-primary dark:hover:text-primary">
                +91 99755 56093
              </a>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900">
              <MapPin className="w-6 h-6 text-zinc-700 dark:text-zinc-200" />
            </span>
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-0.5">Location</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-100 text-base tracking-tight">
                Pune, MH
              </span>
            </div>
          </div>
        </div>
        <Link href="/contact" className="flex justify-center w-full">
          <Button className="rounded-full px-5 py-2 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 shadow-lg text-sm font-semibold mt-2 w-auto mx-auto">
            Contact Me <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </motion.section>
  );
} 