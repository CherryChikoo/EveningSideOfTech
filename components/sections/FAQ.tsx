import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AuroraText } from "@/components/motion/aurora-text";

const faqs = [
  {
    q: "How is EveningSideOfTech different from other internship programs?",
    a: "Most programs hand you tutorials and lectures. We embed you in production teams with real deadlines, real mentors, and real code. When you leave, you have a portfolio — not a certificate.",
  },
  {
    q: "Do I need prior AI experience?",
    a: "Not necessarily. We look for high-agency people who learn fast and care about quality. If you can write code, think critically, and show up every day ready to build — you're ready.",
  },
  {
    q: "What happens during the internship?",
    a: "You'll be paired with a mentor and assigned to an active project within the first week. You'll participate in standups, code reviews, and delivery milestones just like any team member.",
  },
  {
    q: "How long are the internship tracks?",
    a: "Tracks range from 8 to 16 weeks depending on the role. Strategy and adoption roles tend to be shorter. Engineering tracks run longer to allow for deeper system-level work.",
  },
  {
    q: "What do I get at the end?",
    a: "A portfolio of production work, a detailed performance review, a professional reference, and access to our alumni network. Top performers are offered extended roles or referrals to hiring partners.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-32 md:py-40">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-none tracking-tight">
            <AuroraText className="font-serif italic">FAQs</AuroraText>
          </h2>
          <p className="mt-6 text-lg text-foreground/70">
            Everything you need to know before applying.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group card-mint-hover overflow-hidden rounded-2xl"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 p-6 text-left transition-colors hover:text-mint md:p-8"
                >
                  <span className="text-base font-medium md:text-lg">
                    {f.q}
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-mint transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <p className="px-6 pb-6 text-foreground/70 md:px-8 md:pb-8">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
