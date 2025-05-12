import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Select your package",
    description: "Choose the option that best fits your needs",
  },
  {
    number: 2,
    title: "Schedule consultation",
    description: "Discuss your specific requirements",
  },
  {
    number: 3,
    title: "Receive proposal",
    description: "Get a tailored proposal with timeline",
  },
  {
    number: 4,
    title: "Begin development",
    description: "Start the process of creating your website",
  },
];

export function NextStepsSection() {
  return (
    <section
      className="max-w-5xl mx-auto mt-10 mb-32 px-4"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
        Next Steps
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col items-center bg-gradient-to-br from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-zinc-200/50 dark:border-zinc-700/50 p-8 h-full"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-white dark:text-zinc-900 text-2xl font-bold mb-4 shadow-md">
              {step.number}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
              {step.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
} 