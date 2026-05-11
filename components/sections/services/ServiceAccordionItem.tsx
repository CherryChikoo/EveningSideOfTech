"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import type { ServiceDeliverable } from "@/lib/services-data";

interface Props extends ServiceDeliverable {
  index: number;
}

export function ServiceAccordionItem({ title, description, index }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="service-accordion-item"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        className={`service-accordion-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className="service-accordion-icon">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "minus" : "plus"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {isOpen ? (
                <Minus className="h-3.5 w-3.5 text-mint" />
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="service-accordion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.3, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.2 },
              },
            }}
          >
            <div className="service-accordion-body">{description}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
