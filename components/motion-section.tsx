"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionSectionProps = HTMLMotionProps<"section">;

export function MotionSection({ className, children, ...props }: MotionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
