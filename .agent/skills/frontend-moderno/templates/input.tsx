"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface InputProps extends Omit<HTMLMotionProps<"input">, "onFocus" | "onBlur"> {
  label?: string;
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function Input({
  className,
  label,
  error,
  id,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="relative">
      {label && (
        <motion.label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium transition-colors",
            focused ? "text-accent" : "text-muted-foreground"
          )}
          animate={{
            y: focused || props.value ? -24 : 0,
            scale: focused || props.value ? 0.85 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      <motion.input
        id={inputId}
        className={cn(
          "flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          label && "pt-2",
          className
        )}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.();
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.();
        }}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-destructive"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
