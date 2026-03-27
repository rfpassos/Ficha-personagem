"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
}

export function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-xl border border-border bg-card p-6 text-card-foreground",
        hover && "transition-colors hover:border-accent/50",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div className={cn("mb-4", className)} {...props}>
      {children}
    </motion.div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLMotionProps<"h3">) {
  return (
    <motion.h3 className={cn("text-xl font-semibold leading-none tracking-tight", className)} {...props}>
      {children}
    </motion.h3>
  );
}

export function CardDescription({ className, children, ...props }: HTMLMotionProps<"p">) {
  return (
    <motion.p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </motion.p>
  );
}

export function CardContent({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div className={cn("", className)} {...props}>
      {children}
    </motion.div>
  );
}
